# xpcrawl

[![npm version](https://img.shields.io/npm/v/xpcrawl.svg)](https://www.npmjs.com/package/xpcrawl)
[![npm downloads](https://img.shields.io/npm/dm/xpcrawl.svg)](https://www.npmjs.com/package/xpcrawl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Kotlin](https://img.shields.io/badge/Language-Kotlin-orange.svg)](https://kotlinlang.org/)

A versatile Puppeteer-based web crawler designed to extract data using XPath. It supports pagination, piping for multi-step extraction, and includes stealth features to bypass some anti-crawling mechanisms.

## Features

- **XPath Extraction**: Extract text, attributes, or HTML from elements using XPath.
- **Pagination**: Automatically follow "next" links to crawl multiple pages.
- **Piping Support**: Chain multiple instances of the crawler to extract links from one page and then crawl those links for content.
- **Stealth Mode**: Uses `puppeteer-extra-plugin-stealth` and randomized delays to avoid detection.
- **Interactive CAPTCHA Handling**: If blocked (headless mode fails), it optionally switches to visible mode and waits for you to solve the CAPTCHA.
- **Headless Toggle**: Run in headless mode (default) or visible mode (`--visible`).

## Installation

Install globally via npm:

```bash
npm install -g xpcrawl
```

Or run directly with npx:

```bash
npx xpcrawl <url> <xpath>
```

## Usage

### Basic Syntax

```bash
xpcrawl <url> <xpath> [--paginate <pagination_xpath>] [--delay <ms>] [--visible]
```

Or via pipe:

```bash
echo <url> | xpcrawl <xpath> [--delay <ms>]
```

### Arguments

- `<url>`: The starting URL to crawl.
- `<xpath>`: (Optional) The XPath query to extract data. If omitted, xpcrawl enters **Smart Mode**.

### Smart Mode

If you don't provide an XPath, xpcrawl will automatically attempt to extract the most relevant content from the page, including:
- Page Title
- Headings (H1, H2, H3)
- Paragraphs
- Link targets (hrefs)
- Image sources (srcs)
- `--paginate <xpath>`: (Optional) XPath to find the "Next Page" link.
- `--delay <ms>`: (Optional) Delay in milliseconds between requests (adds random jitter).
- `--visible`: (Optional) Run the browser in visible mode (useful for debugging).

### CLI-Specific Features

When using xpcrawl as a CLI tool, you get additional interactive features:

#### Interactive CAPTCHA Handling

If a website presents a CAPTCHA and no results are found:

1. **Automatic Detection**: The CLI automatically switches from headless to visible mode
2. **Browser Opens**: A browser window appears showing the CAPTCHA
3. **Manual Intervention**: Solve the CAPTCHA in the browser
4. **Interactive Prompt**: The CLI prompts you to press Enter to retry or type "skip" to continue
5. **Resume Crawling**: After solving, press Enter and crawling continues

```bash
# Example: If CAPTCHA is detected
xpcrawl "https://protected-site.com" "//h1"

# Output:
# --- No matches found in headless mode. Switching to VISIBLE mode for CAPTCHA resolution... ---
# Browser restarted. Navigating back to target...
# 
# --- No matches found. CAPTCHA detected? ---
# Browser is open. Solve the CAPTCHA or fix the page state.
# Press ENTER to retry extraction, or type "skip" to move on.
# >
```

### CLI Examples

#### Example 1: Download Book Covers

This example demonstrates a full pipeline:
1. **Crawl** a category page to find book links
2. **Extract** the cover image URL from each book page
3. **Download** the images in parallel using `wget`

```bash
mkdir -p covers
xpcrawl "http://books.toscrape.com/catalogue/category/books/travel_2/index.html" "//h3/a/@href" | \
xpcrawl "//div[@id='product_gallery']//img/@src" | \
xargs -P 4 -n 1 -I {} wget -q -P covers {}
```

#### Example 2: Extract Article Titles with Pagination

Crawl a blog or news site with pagination:

```bash
xpcrawl "https://example.com/blog" "//article//h2/a/text()" \
  --paginate "//a[@rel='next']/@href" \
  --delay 1000
```

#### Example 3: Scrape Product Prices

Extract product information from an e-commerce site:

```bash
xpcrawl "https://example.com/products" "//div[@class='product']//span[@class='price']/text()"
```

#### Example 4: Get All Links from a Page

Extract all absolute URLs from a webpage:

```bash
xpcrawl "https://example.com" "//a/@href"
```

---


## Programmatic Usage

You can also use xpcrawl as a library in your Node.js projects:

```bash
npm install xpcrawl
```

### Basic Example

```javascript
const { crawl } = require('xpcrawl');

async function main() {
    const results = await crawl({
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/text()'
    });
    
    console.log('Book titles:', results);
}

main();
```

### API Reference

#### `crawl(options)`

Crawl a URL or HTML content and extract data using XPath.

**Options:**
- `url` (string): URL to crawl (mutually exclusive with `html`)
- `html` (string): HTML content to parse (mutually exclusive with `url`)
- `xpath` (string, required): XPath query to extract data
- `paginationXpath` (string): XPath to find next page link
- `delay` (number): Delay in ms between requests (default: 0)
- `headless` (boolean): Run browser in headless mode (default: true)
- `autoSwitchVisible` (boolean): Auto-switch to visible mode on CAPTCHA (default: true)
- `onResult` (function): Callback for each result batch `(matches) => {}`
- `onPage` (function): Callback for each page processed `(url) => {}`

**Returns:** `Promise<string[]>` - Array of extracted values

#### `crawlMultiple(options)`

Crawl multiple URLs in sequence.

**Options:** Same as `crawl()`, plus:
- `urls` (string[], required): Array of URLs to crawl

**Returns:** `Promise<string[]>` - Array of all extracted values

### CAPTCHA Handling in Library Mode

When using xpcrawl as a library (not CLI), CAPTCHA handling works differently:

- ✅ **Automatic switch to visible mode**: If `autoSwitchVisible: true` (default), the browser will automatically switch from headless to visible mode when no results are found
- ✅ **Browser stays open**: The visible browser window remains open, allowing you to solve CAPTCHAs
- ❌ **No interactive prompt**: Unlike CLI mode, there's no terminal prompt asking you to press Enter
- ⚠️ **Manual handling required**: You need to implement your own logic to wait for CAPTCHA resolution

**Example with manual CAPTCHA handling:**

```javascript
const { crawl } = require('xpcrawl');

async function crawlWithCaptchaHandling() {
    const results = await crawl({
        url: 'https://protected-site.com',
        xpath: '//h1/text()',
        headless: false,  // Start in visible mode
        autoSwitchVisible: false,  // Disable auto-switch since we're already visible
        onResult: (matches) => {
            if (matches.length === 0) {
                console.log('No results found. Please solve CAPTCHA in the browser window.');
                console.log('The browser will stay open for 60 seconds...');
            }
        }
    });
    
    return results;
}
```

**Recommendation**: For production use with CAPTCHAs, consider:
- Starting with `headless: false` to see what's happening
- Using CAPTCHA-solving services
- Implementing retry logic with delays
- Using the CLI mode for interactive debugging


### More Examples

See the [examples directory](./examples) for more usage patterns:

```javascript
// Smart Mode (automatic extraction)
const results = await crawl({
    url: 'https://example.com'
    // xpath is optional!
});

// With pagination
const results = await crawl({
    url: 'https://example.com/blog',
    xpath: '//article//h2/a/text()',
    paginationXpath: '//a[@rel="next"]/@href',
    delay: 1000
});

// Parse HTML directly
const results = await crawl({
    html: '<html><body><h1>Hello</h1></body></html>',
    xpath: '//h1/text()'
});

// Stream results with callbacks
await crawl({
    url: 'https://example.com',
    xpath: '//a/@href',
    onResult: (matches) => console.log('Batch:', matches),
    onPage: (url) => console.log('Processing:', url)
});
```

### TypeScript Support

xpcrawl includes TypeScript type definitions out of the box:

```typescript
import { crawl, crawlMultiple, CrawlOptions } from 'xpcrawl';

// Full type safety
const options: CrawlOptions = {
    url: 'https://example.com',
    xpath: '//h1/text()',
    delay: 1000,
    onResult: (matches: string[]) => {
        console.log('Results:', matches);
    }
};

const results: string[] = await crawl(options);
```

**Available Types:**
- `CrawlOptions` - Options for the `crawl()` function
- `CrawlMultipleOptions` - Options for the `crawlMultiple()` function

See [examples/typescript-usage.ts](./examples/typescript-usage.ts) for more TypeScript examples.

### Kotlin/JS Support

xpcrawl can be used from Kotlin/JS projects via npm:

```kotlin
// build.gradle.kts
dependencies {
    implementation(npm("xpcrawl", "1.0.0"))
}
```

```kotlin
// External declarations
@file:JsModule("xpcrawl")
external fun crawl(options: CrawlOptions): Promise<Array<String>>

// Usage
suspend fun example() {
    val results = crawl(object : CrawlOptions {
        override var url = "https://example.com"
        override var xpath = "//h1/text()"
        override var headless = true
    }).await()
    
    println(results)
}
```

See [examples/kotlin-js/](./examples/kotlin-js/) for a complete Kotlin/JS example with Gradle setup.

> **Note**: The Kotlin/JS example is provided as a reference. It requires xpcrawl to be published to npm and additional Kotlin/JS setup (coroutines, Gradle, JDK). For most use cases, we recommend using TypeScript for type safety or JavaScript for simplicity.

---


## XPath Quick Reference

Here are some common XPath patterns you can use with xpcrawl:

| Pattern | Description |
|---------|-------------|
| `//h1` | All `<h1>` elements |
| `//h1/text()` | Text content of all `<h1>` elements |
| `//a/@href` | All `href` attributes from links (auto-resolved to absolute URLs) |
| `//img/@src` | All `src` attributes from images (auto-resolved to absolute URLs) |
| `//div[@class='content']` | All divs with class "content" |
| `//div[@id='main']//p` | All paragraphs inside the div with id "main" |
| `//a[contains(@href, 'product')]` | Links containing "product" in href |
| `//span[@class='price']/text()` | Text content of price spans |

**Note**: When extracting `href` or `src` attributes, xpcrawl automatically converts relative URLs to absolute URLs based on the page's base URI.

## Advanced Usage

### Piping HTML Content

You can pipe HTML content directly to xpcrawl instead of providing a URL:

```bash
curl -s https://example.com | xpcrawl "//h1/text()"
```

### Using with jq for JSON Output

Combine with `jq` to create structured JSON output:

```bash
xpcrawl "https://example.com/products" "//div[@class='product']/@data-id" | \
jq -R -s 'split("\n") | map(select(length > 0)) | {product_ids: .}'
```

### Debugging with Visible Mode

When developing your XPath queries or troubleshooting issues, use `--visible` to see what the browser is doing:

```bash
xpcrawl "https://example.com" "//h1" --visible
```

### Handling Rate Limits

Add delays between requests to avoid overwhelming servers or triggering rate limits:

```bash
xpcrawl "https://example.com" "//a/@href" --delay 2000  # 2 second delay (with random jitter)
```

---


## Troubleshooting

### No Output

- **Check your XPath**: Use browser DevTools to test your XPath query. Right-click → Inspect, then use the Console to test with `$x("your-xpath-here")`.
- **Wait for content**: Some sites load content dynamically. The crawler waits for `networkidle2` by default, but complex SPAs might need additional handling.
- **Check for blocking**: If the site detects automation, try adding `--delay` or use `--visible` to solve CAPTCHAs.

### Relative URLs Not Working

xpcrawl automatically resolves relative URLs in `href` and `src` attributes to absolute URLs. If you're getting relative URLs, make sure you're extracting the attribute (e.g., `//a/@href`) rather than the element itself.

### Timeout Errors

If you see "Navigation timeout" errors:
- The site might be slow or blocking automated access
- Try increasing the timeout (currently hardcoded to 60 seconds)
- Use `--visible` to see what's happening in the browser

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
