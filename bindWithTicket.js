function smartTag(barcode, shelving, level){
    const got = require('got');
    const config = require('./config');
    (async() => {
        const info = await config.info
        let key = info.data.token
        let currentUser = info.data.currentUser;
            (async() => {
                const { body } = await got.post('http://app.etiquetaselectronicas.com:9999/item/batchImportItem', {
                        json: {
                            agencyId: currentUser.agencyId,
                            merchantId: currentUser.merchantId,
                            storeId: currentUser.storeId,
                            unitName: currentUser.unitName,
                            itemList: [
                                {
                                    attrCategory: "verdnatura",
                                    attrName: "conTicket",
                                    barCode: shelving + level,
                                    itemTitle: "Etiqueta Con ticket",
                                    productCode: shelving + level,
                                    custFeature1: "Juan",
                                    custFeature2: "MRW",
                                    custFeature3: "123456789"
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
var shelving = "ABC";
var level = "1";

smartTag(barcode, shelving, level);
