const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// Helper to sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Crawl a URL or HTML content and extract data using XPath
 * @param {Object} options - Crawling options
 * @param {string} [options.url] - URL to crawl (mutually exclusive with html)
 * @param {string} [options.html] - HTML content to parse (mutually exclusive with url)
 * @param {string} options.xpath - XPath query to extract data
 * @param {string} [options.paginationXpath] - XPath to find next page link
 * @param {number} [options.delay=0] - Delay in ms between requests (with random jitter)
 * @param {boolean} [options.headless=true] - Run browser in headless mode
 * @param {boolean} [options.autoSwitchVisible=true] - Auto-switch to visible mode on CAPTCHA
 * @param {Function} [options.onResult] - Callback for each result (receives array of matches)
 * @param {Function} [options.onPage] - Callback for each page processed (receives URL)
 * @returns {Promise<string[]>} Array of extracted values
 */
async function crawl(options) {
    const {
        url: startUrl,
        html,
        xpath,
        paginationXpath,
        delay = 0,
        headless: initialHeadless = true,
        autoSwitchVisible = true,
        onResult,
        onPage
    } = options;

    if (!xpath) {
        throw new Error('xpath is required');
    }

    if (!startUrl && !html) {
        throw new Error('Either url or html must be provided');
    }

    let headless = initialHeadless;
    const allResults = [];

    async function setupPage(pageInstance) {
        await pageInstance.setViewport({ width: 1280, height: 800 });
    }

    async function launchBrowser(isHeadless) {
        const browserInstance = await puppeteer.launch({
            headless: isHeadless,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const pageInstance = await browserInstance.newPage();
        await setupPage(pageInstance);
        return { browser: browserInstance, page: pageInstance };
    }

    let { browser, page } = await launchBrowser(headless);

    const visited = new Set();
    let requestCount = 0;

    async function processTarget(target) {
        if (target.type === 'url') {
            if (visited.has(target.content)) return null;
            visited.add(target.content);
            if (onPage) onPage(target.content);
        }

        if (delay > 0 && requestCount > 0) {
            const jitter = Math.floor(Math.random() * (delay * 0.2));
            await sleep(delay + jitter);
        }
        requestCount++;

        try {
            let matches;
            let shouldRetry = true;
            let needsNavigation = true;

            while (shouldRetry) {
                if (needsNavigation) {
                    if (target.type === 'url') {
                        await page.goto(target.content, { waitUntil: 'networkidle2', timeout: 60000 });
                    } else {
                        await page.setContent(target.content, { waitUntil: 'networkidle2' });
                    }
                    needsNavigation = false;
                }

                shouldRetry = false;

                matches = await page.evaluate((xpathQuery) => {
                    const results = [];
                    try {
                        const query = document.evaluate(xpathQuery, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        for (let nodeIndex = 0; nodeIndex < query.snapshotLength; nodeIndex++) {
                            const node = query.snapshotItem(nodeIndex);
                            let value = '';
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                value = node.textContent ? node.textContent.trim() : '';
                                if (!value) {
                                    if (node.tagName === 'A') value = node.href || '';
                                    else if (node.tagName === 'IMG') value = node.src || '';
                                    else if (node.tagName === 'INPUT') value = node.value || '';
                                }
                                if (!value) value = node.outerHTML;
                            } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
                                value = node.value || '';
                                if ((node.name === 'href' || node.name === 'src') && value) {
                                    try {
                                        value = new URL(value, document.baseURI).href;
                                    } catch (urlError) { /* ignore invalid */ }
                                }
                            } else if (node.nodeType === Node.TEXT_NODE) {
                                value = node.nodeValue ? node.nodeValue.trim() : '';
                            }
                            if (value) results.push(value);
                        }
                    } catch (evalError) {
                        return { error: evalError.message };
                    }
                    return results;
                }, xpath);

                if (matches.error) {
                    throw new Error(`XPath evaluation error: ${matches.error}`);
                } else if (matches.length > 0) {
                    allResults.push(...matches);
                    if (onResult) onResult(matches);
                } else {
                    // Auto-switch to visible mode if enabled
                    if (autoSwitchVisible && headless && target.type === 'url') {
                        await browser.close();
                        headless = false;
                        const newSession = await launchBrowser(false);
                        browser = newSession.browser;
                        page = newSession.page;
                        needsNavigation = true;
                        shouldRetry = true;
                        continue;
                    }
                }
            }

            // Handle pagination
            if (paginationXpath && target.type === 'url') {
                const nextLink = await page.evaluate((xpathQuery) => {
                    try {
                        const query = document.evaluate(xpathQuery, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                        const node = query.singleNodeValue;
                        if (node) {
                            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
                                return node.href;
                            } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
                                return node.value;
                            }
                        }
                    } catch (paginationError) { return null; }
                    return null;
                }, paginationXpath);
                return nextLink;
            }

        } catch (innerErr) {
            throw new Error(`Error processing target: ${innerErr.message}`);
        }
        return null;
    }

    async function processUrlSequence(url) {
        let nextUrl = url;
        while (nextUrl) {
            const foundNext = await processTarget({ type: 'url', content: nextUrl });
            if (foundNext && !visited.has(foundNext)) {
                nextUrl = foundNext;
            } else {
                nextUrl = null;
            }
        }
    }

    try {
        if (startUrl) {
            await processUrlSequence(startUrl);
        } else if (html) {
            await processTarget({ type: 'html', content: html });
        }
    } finally {
        await browser.close();
    }

    return allResults;
}

/**
 * Crawl multiple URLs in sequence
 * @param {Object} options - Crawling options (same as crawl())
 * @param {string[]} options.urls - Array of URLs to crawl
 * @returns {Promise<string[]>} Array of all extracted values
 */
async function crawlMultiple(options) {
    const urls = options.urls;

    if (!urls || !Array.isArray(urls)) {
        throw new Error('urls must be an array');
    }

    const allResults = [];

    for (const url of urls) {
        // We avoid the spread/rest operator here because it only captures 
        // enumerable OWN properties. Inherited properties (common in Interop)
        // would be lost. By using Object.create(options), we ensure crawl()
        // can access all properties via the prototype chain.
        const singleOptions = Object.create(options);
        singleOptions.url = url;

        const results = await crawl(singleOptions);
        allResults.push(...results);
    }

    return allResults;
}

module.exports = {
    crawl,
    crawlMultiple
};
