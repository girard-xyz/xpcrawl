@file:JsModule("xpcrawl")
@file:JsNonModule

package xpcrawl

import kotlin.js.Promise

/**
 * Options for crawling
 */
external interface CrawlOptions {
    var url: String?
    var html: String?
    var xpath: String
    var paginationXpath: String?
    var delay: Int?
    var headless: Boolean?
    var autoSwitchVisible: Boolean?
    var onResult: ((Array<String>) -> Unit)?
    var onPage: ((String) -> Unit)?
}

/**
 * Options for crawling multiple URLs
 */
external interface CrawlMultipleOptions {
    var urls: Array<String>
    var xpath: String
    var paginationXpath: String?
    var delay: Int?
    var headless: Boolean?
    var autoSwitchVisible: Boolean?
    var onResult: ((Array<String>) -> Unit)?
    var onPage: ((String) -> Unit)?
}

/**
 * Crawl a URL or HTML content and extract data using XPath
 */
external fun crawl(options: CrawlOptions): Promise<Array<String>>

/**
 * Crawl multiple URLs in sequence
 */
external fun crawlMultiple(options: CrawlMultipleOptions): Promise<Array<String>>
