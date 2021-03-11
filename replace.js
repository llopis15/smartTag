function replaceTag(barcode, shelving, level){
    const got = require('got');
    const config = require('./config');
    (async() => {
            const info = await config.info
            let key = info.data.token;
            const { body } = await got.post('http://app.etiquetaselectronicas.com:9999/bind/batchBind', {
                json: {
                    storeId: config.storeId,
                    tagItemBinds: [{
                            eslBarcode: barcode,
                            itemBarcode: shelving + level
                        }
                    ]
                },
                responseType: 'json',
                headers: {
                    "Authorization": key
                }
            })
            console.log(body)
    })();
}

var barcode = "A0A3B8207222";
var shelving = "ABC";
var level = "2";

replaceTag(barcode, shelving, level);