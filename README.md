# product-crawler
Javascript based web crawler to crawl product from e-commerce sites

# Goal
The goal of the project is to develop Apify based crawler to crawl all the product page from the a German supermarket called [Edeka](https://www.edeka24.de/).

# Requirements

- The crawler should run locally on your machine as a Node.js based CLI application
- The crawler should not use a browser (please base it on Apify's CheerioCrawler)
- The site to crawl is: https://www.edeka24.de
-  The crawler should find and download every product page available on the site (here
is an example of one:
https://www.edeka24.de/Wein/Sekt-Prosecco/Deutschland/Kessler-Sekt-Hochgewae
chs-Chardonnay-Brut-0-75L.html)
- All product pages found by your crawler should be saved locally to disk in a
dedicated Apify KeyValueStore named "product-pages"
- Resources that are not product pages (e.g. the home page) can be downloaded but if you do so, these should be stored in a separate Apify KeyValueStore

# Datapoints to extract from Product page

An e-commerce crawler is mainly built to crawl the price of the product. Considering this we are going to extract the below datapoint from the product page
- Entire HTML page of the product
- Title of the product
- Price of the product

# How the Crawler Works?

This crawler uses `sitemap` to crawl the product from website. `The sitemap.xml file is a jackpot for every web scraper and of course for edeka scraper too`.

Following are the steps involvd in crawler development

- Locate the sitemap URL
- Add all the product links to Request list
- Call the HandlePagefunction
- Extract the datapoint(title,price,html)
- Save the datapoints in Key value store `product-store`

### **what is sitemap?**

A sitemap is a file where websites provide information about the pages,  on their site in an orgainsed way. Search engines like Google read this file to crawl your site more efficiently

### **how to locate the sitemap?**

The sitemap can be found at the path `/sitemap.xml` or `/robots.txt` (rules defined for crawlers on how to crawl their site). It is always worth trying that URL. 

for Edeka , the sitemap URL is https://www.edeka24.de/sitemaps/sitemap-index.xml which is found from `/robots.txt` file 

In this page you can clearly find the sitemap for products is https://www.edeka24.de/sitemaps/sitemap_0-products-0.xml which list all the product pages  **<em>jackpot for us right?</em>**

### **why use sitemap for crawling?**

- Focused Crawling (Crawl what you need)- (Product pages)
- Less web request to get the Href from each page and filter product pages
- Efficient way of Crawling

# How to setup the project in Local?

Pre-requisites
- Node 10.17 or higher
- NPM
  
```sh
npm install -g apify-cli # install apify CLI 

git clone https://github.com/Jebaseelanravi/product-crawler.git

cd product-crawler

cd edeka-crawler

apify run -p # run the crawler
```
Once you run the crawler the results will be stored in the path `./apify_storage/key_value_stores/product_store/id.json`

# Sample result

```json
{
  "title": "Bortzmeyer Traditionell Elsass Quetsch 0,7 ltr",
  "price": "10,99€",
  "webpage": "<!DOCTYPE HTML>\n\n<html lang=\"de\">
            <body>HTML content truncated for example</body>\n</html>"
}
```
# TODO

Set the `Crawl Delay = 5 sec` (time between subsequent request to make sure our crawl does not get banned)

Crawl delay is specified in `/robots.txt`