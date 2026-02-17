import { crawl, crawlMultiple, CrawlOptions } from '../lib/crawler';

// Example 1: Simple crawl with TypeScript
async function example1() {
    console.log('Example 1: Extract book titles (TypeScript)');

    const results: string[] = await crawl({
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/text()'
    });

    console.log('Found titles:', results);
}

// Example 2: With full type safety
async function example2() {
    console.log('\nExample 2: Type-safe crawl options');

    const options: CrawlOptions = {
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/@href',
        delay: 1000,
        headless: true,
        onResult: (matches: string[]) => {
            console.log(`Got ${matches.length} results`);
        },
        onPage: (url: string) => {
            console.log(`Processing: ${url}`);
        }
    };

    const results: string[] = await crawl(options);
    console.log(`Total results: ${results.length}`);
}

// Example 3: Crawl multiple URLs with type safety
async function example3() {
    console.log('\nExample 3: Crawl multiple URLs');

    const urls: string[] = [
        'http://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html',
        'http://books.toscrape.com/catalogue/under-the-tuscan-sun_504/index.html'
    ];

    const results: string[] = await crawlMultiple({
        urls,
        xpath: '//h1/text()',
        headless: true
    });

    console.log('Book titles:', results);
}

// Run examples
(async () => {
    try {
        await example1();
        // await example2();
        // await example3();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
    }
})();
