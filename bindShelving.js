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

///DATOS INTRODUCIDOS POR EL USUARIO////
var barcode = "A0A3B820690F"; //valido = "A0A3B82"+ 4 CARACTERES HEXADECIMALES (0-F)
var shelving = "BCD";   //valido = 3 CARACTERES LETRAS (A-Z)
var level = "1";
//////////////////////////////////////

if(insert.filter(barcode,"barcode")){
    if(insert.filter(shelving,"shelving")){
        smartTag(barcode, shelving, level);
    }
    else{
    console.log("¡MATRICULA INCORRECTA!")
    }
}
else{
    console.log("¡CODIGO DE ETIQUETA INCORRECTO!")
}
