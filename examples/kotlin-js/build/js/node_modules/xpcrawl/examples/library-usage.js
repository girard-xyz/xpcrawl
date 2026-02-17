const { crawl, crawlMultiple } = require('../lib/crawler');

// Example 1: Simple crawl
async function example1() {
    console.log('Example 1: Extract book titles');

    const results = await crawl({
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/text()'
    });

    console.log('Found titles:', results);
}

// Example 2: Crawl with pagination
async function example2() {
    console.log('\nExample 2: Crawl with pagination');

    const results = await crawl({
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/@href',
        paginationXpath: '//li[@class="next"]/a/@href',
        delay: 1000
    });

    console.log(`Found ${results.length} book links`);
}

// Example 3: With callbacks for streaming results
async function example3() {
    console.log('\nExample 3: Stream results with callbacks');

    await crawl({
        url: 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html',
        xpath: '//h3/a/text()',
        onResult: (matches) => {
            console.log('Got batch:', matches);
        },
        onPage: (url) => {
            console.log('Processing:', url);
        }
    });
}

// Example 4: Parse HTML content directly
async function example4() {
    console.log('\nExample 4: Parse HTML content');

    const html = `
        <html>
            <body>
                <h1>Test Page</h1>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </body>
        </html>
    `;

    const results = await crawl({
        html,
        xpath: '//li/text()'
    });

    console.log('Items:', results);
}

// Example 5: Crawl multiple URLs
async function example5() {
    console.log('\nExample 5: Crawl multiple URLs');

    const urls = [
        'http://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html',
        'http://books.toscrape.com/catalogue/under-the-tuscan-sun_504/index.html'
    ];

    const results = await crawlMultiple({
        urls,
        xpath: '//h1/text()'
    });

    console.log('Book titles:', results);
}

// Run examples
(async () => {
    try {
        await example1();
        // await example2();
        // await example3();
        // await example4();
        // await example5();
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
