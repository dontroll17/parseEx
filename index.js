const axios = require('axios');
const cheerio = require('cheerio');
const { writeFile } = require('fs/promises');
const url = 'https://scrapeme.live/shop/';

const file = async (data) => {
    const dataJSON = JSON.stringify(data)
    await writeFile('out.json', dataJSON)
}

const extactlinks = $ => 
    $('.product')
        .map((_, product) => {
            const $product = $(product);
            return {
                id: $product.find('a[data-product_id]').attr('data-product_id'),
                title: $product.find('h2').text(),
                price: $product.find('.price').text()
            };
        }).toArray();

const getReq = async(url) => {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ctx = extactlinks($);
    file(ctx);
    console.log(ctx);
}

try{
    getReq(url);
}catch(e){
    console.error(e);
}
