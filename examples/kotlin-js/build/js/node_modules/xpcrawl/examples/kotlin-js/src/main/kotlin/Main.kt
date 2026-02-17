import kotlinx.coroutines.*
import xpcrawl.*

suspend fun main() {
    // Example 1: Simple crawl
    println("Example 1: Extract book titles")
    
    val results = crawl(object : CrawlOptions {
        override var url: String? = "http://books.toscrape.com/catalogue/category/books/travel_2/index.html"
        override var html: String? = null
        override var xpath = "//h3/a/text()"
        override var paginationXpath: String? = null
        override var delay: Int? = null
        override var headless: Boolean? = true
        override var autoSwitchVisible: Boolean? = true
        override var onResult: ((Array<String>) -> Unit)? = null
        override var onPage: ((String) -> Unit)? = null
    }).await()
    
    println("Found ${results.size} titles:")
    results.forEach { println("  - $it") }
    
    // Example 2: With callbacks
    println("\nExample 2: With callbacks")
    
    crawl(object : CrawlOptions {
        override var url: String? = "http://books.toscrape.com/catalogue/category/books/travel_2/index.html"
        override var html: String? = null
        override var xpath = "//h3/a/@href"
        override var paginationXpath: String? = null
        override var delay: Int? = 1000
        override var headless: Boolean? = true
        override var autoSwitchVisible: Boolean? = true
        override var onResult: ((Array<String>) -> Unit)? = { matches ->
            println("Got ${matches.size} links")
        }
        override var onPage: ((String) -> Unit)? = { url ->
            println("Processing: $url")
        }
    }).await()
    
    // Example 3: Crawl multiple URLs
    println("\nExample 3: Crawl multiple URLs")
    
    val bookResults = crawlMultiple(object : CrawlMultipleOptions {
        override var urls = arrayOf(
            "http://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html",
            "http://books.toscrape.com/catalogue/under-the-tuscan-sun_504/index.html"
        )
        override var xpath = "//h1/text()"
        override var paginationXpath: String? = null
        override var delay: Int? = null
        override var headless: Boolean? = true
        override var autoSwitchVisible: Boolean? = true
        override var onResult: ((Array<String>) -> Unit)? = null
        override var onPage: ((String) -> Unit)? = null
    }).await()
    
    println("Book titles:")
    bookResults.forEach { println("  - $it") }
}
