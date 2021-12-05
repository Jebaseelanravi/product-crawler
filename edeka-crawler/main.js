const Apify = require('apify');

Apify.main(async () => {

    var uniqueid = 1; // unique id for each product

    // Add URLs to a RequestList from a sitemap
    const requestList = await new Apify.RequestList({
        sources: [{
            requestsFromUrl: 'https://www.edeka24.de/sitemaps/sitemap_0-products-0.xml',                      
        }],
    });
    await requestList.initialize();

    // Get the default input
    const input = await Apify.getInput();

    // Open a named key-value store
    const store = await Apify.openKeyValueStore('product-store');

    // Function called for each URL
    const handlePageFunction = async ({ request,$, body,context}) => {
        if (request.url.endsWith(".html")) // sanity check to allow only product url : reject urls from sitemap like http://www.sitemaps.org/schemas/sitemap/0.9
        {
            // const webpage = $('html').html(); // extract the html
            const title = $("title").text(); //extract the title of the product
            const price = $(".price").text().replace(/(\r\n|\n|\r|\s+)/gm, ""); // extract the price of the product     
            await store.setValue(uniqueid.toString(), { "title": title,"price":price,"webpage":body });
            uniqueid+=1;
            console.log("Crawled product : ",title) 
        }
    };

    // Create a crawler that uses Cheerio for Modern Web pages use Pupeeter
    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction,
        minConcurrency: 1, // set the minimum parallelism
    });

    // Run the crawler
    await crawler.run();

});