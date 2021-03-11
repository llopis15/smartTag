function insertTicket(sql, shelving){
    const config = require('./config');
    const got = require('got');
    (async() => {
        const info = await config.info
        let key = info.data.token
        let currentUser = info.data.currentUser;
        (async() => {
            for(var i=0;i<sql.length;i++){
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
                                barCode: shelving + sql[i].level,//Matricula + nivel
                                itemTitle: "Etiqueta Con ticket",
                                productCode: sql[i].ticketFk, //Ticket 
                                custFeature1: sql[i].nickname, //Client
                                custFeature2: sql[i].agencyModeFk //Agencia de transporte
                            }
                        ]
                    },
                    responseType: 'json',
                    headers: {
                        "Authorization": key
                    }
                })
                console.log(body)
            }
        })();
    })();
}


function insertShelving(shelving, level){
    const config = require('./config');
    const got = require('got');
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
                                attrName: "sinTicket",
                                barCode: shelving + level,//Matricula + nivel
                                itemTitle: "Etiqueta Sin ticket",
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
}

function filter(toFilter, type){
    if(type=="barcode"){
        exp = /A0A3B82[A-F0-9][A-F0-9][A-F0-9][A-F0-9][A-F0-9]/
    }
    if(type=="shelving"){
        exp = /[A-F][A-F][A-F]/
    }
    return exp.test(toFilter)
}
exports.insertTicket = insertTicket;
exports.insertShelving = insertShelving;
exports.filter = filter;




