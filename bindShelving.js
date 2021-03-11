const insert = require('./Inserts');


function smartTag(barcode, shelving, level){
    const got = require('got');
    const config = require('./config');
    (async() => {
        insert.insertShelving(shelving, level);
        (async() => {
            const info = await config.info
            let key = info.data.token;
    
            (async() => {
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
        })();
    })();
}

var barcode = "A0A3B820690F";
var shelving = "BCD";
var level = "1";

smartTag(barcode, shelving, level);
