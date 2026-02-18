export interface CrawlOptions {
    /**
     * URL to crawl (mutually exclusive with html)
     */
    url?: string;

    /**
     * HTML content to parse (mutually exclusive with url)
     */
    html?: string;

    /**
     * XPath query to extract data
     */
    xpath?: string;

    /**
     * XPath to find next page link for pagination
     */
    paginationXpath?: string;

    /**
     * Delay in milliseconds between requests (adds random jitter)
     * @default 0
     */
    delay?: number;

    /**
     * Run browser in headless mode
     * @default true
     */
    headless?: boolean;

    /**
     * Automatically switch to visible mode when CAPTCHA is detected
     * @default true
     */
    autoSwitchVisible?: boolean;

    /**
     * Callback function called for each batch of results
     */
    onResult?: (matches: string[]) => void;

    /**
     * Callback function called for each page processed
     */
    onPage?: (url: string) => void;
}

export interface CrawlMultipleOptions extends Omit<CrawlOptions, 'url' | 'html'> {
    /**
     * Array of URLs to crawl
     */
    urls: string[];
}

/**
 * Crawl a URL or HTML content and extract data using XPath
 * 
 * @param options - Crawling options
 * @returns Promise that resolves to an array of extracted values
 * 
 * @example
 * ```typescript
 * const results = await crawl({
 *     url: 'https://example.com',
 *     xpath: '//h1/text()'
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // With pagination
 * const results = await crawl({
 *     url: 'https://example.com/blog',
 *     xpath: '//article//h2/a/text()',
 *     paginationXpath: '//a[@rel="next"]/@href',
 *     delay: 1000
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // Parse HTML directly
 * const results = await crawl({
 *     html: '<html><body><h1>Hello</h1></body></html>',
 *     xpath: '//h1/text()'
 * });
 * ```
 */
export function crawl(options: CrawlOptions): Promise<string[]>;

/**
 * Crawl multiple URLs in sequence
 * 
 * @param options - Crawling options with array of URLs
 * @returns Promise that resolves to an array of all extracted values
 * 
 * @example
 * ```typescript
 * const results = await crawlMultiple({
 *     urls: ['https://example.com/page1', 'https://example.com/page2'],
 *     xpath: '//h1/text()'
 * });
 * ```
 */
export function crawlMultiple(options: CrawlMultipleOptions): Promise<string[]>;
