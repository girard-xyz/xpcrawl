#!/usr/bin/env node
const { crawl } = require('./lib/crawler');
const readline = require('readline');

// Helper to parse CLI args
function parseArgs() {
    const args = process.argv.slice(2);
    let headless = true;
    let url = null;
    let xpath = null;
    let paginationXpath = null;
    let paginateNext = false;
    let delay = 0;
    let delayNext = false;

    for (const arg of args) {
        if (arg === '--visible') {
            headless = false;
            continue;
        }
        if (arg === '--paginate') {
            paginateNext = true;
            continue;
        }
        if (paginateNext) {
            paginationXpath = arg;
            paginateNext = false;
            continue;
        }
        if (arg === '--delay') {
            delayNext = true;
            continue;
        }
        if (delayNext) {
            delay = parseInt(arg, 10);
            delayNext = false;
            continue;
        }

        if (!url && (arg.startsWith('http') || arg.startsWith('file://'))) {
            url = arg;
        } else if (!xpath) {
            xpath = arg;
        } else if (!url) {
            url = arg;
        }
    }

    return { url, xpath, paginationXpath, delay, headless };
}

async function main() {
    try {
        const { url: argUrl, xpath, paginationXpath, delay, headless } = parseArgs();

        if (!xpath) {
            console.error('Usage: \n  xpcrawl <url> <xpath> [--paginate <pagination_xpath>] [--delay <ms>] [--visible]\n  echo <url> | xpcrawl <xpath>');
            process.exit(1);
        }

        // Check if we're receiving piped input
        const isInputPiped = !process.stdin.isTTY;

        if (argUrl) {
            // Direct URL mode
            const results = await crawl({
                url: argUrl,
                xpath,
                paginationXpath,
                delay,
                headless,
                onResult: (matches) => {
                    console.log(matches.join('\n'));
                }
            });
        } else if (isInputPiped) {
            // Stdin mode
            const readlineInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            let firstLine = true;
            let isHtmlMode = false;
            let htmlBuffer = '';
            const urls = [];

            for await (const line of readlineInterface) {
                const trimmed = line.trim();
                if (!trimmed) continue;

                if (firstLine) {
                    if (trimmed.match(/^(https?:\/\/|file:\/\/)/i)) {
                        // URL Mode
                        urls.push(trimmed);
                    } else {
                        // HTML Mode
                        isHtmlMode = true;
                        htmlBuffer += trimmed + '\n';
                    }
                    firstLine = false;
                } else {
                    if (isHtmlMode) {
                        htmlBuffer += trimmed + '\n';
                    } else {
                        urls.push(trimmed);
                    }
                }
            }

            if (isHtmlMode && htmlBuffer) {
                // Process HTML
                await crawl({
                    html: htmlBuffer,
                    xpath,
                    delay,
                    headless,
                    onResult: (matches) => {
                        console.log(matches.join('\n'));
                    }
                });
            } else if (urls.length > 0) {
                // Process URLs sequentially
                for (const url of urls) {
                    await crawl({
                        url,
                        xpath,
                        paginationXpath,
                        delay,
                        headless,
                        onResult: (matches) => {
                            console.log(matches.join('\n'));
                        }
                    });
                }
            }
        } else {
            console.error('Error: No URL provided and no piped input detected');
            process.exit(1);
        }

    } catch (error) {
        console.error('Fatal Error:', error.message);
        process.exit(1);
    }
}

main();
