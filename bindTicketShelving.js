
const insertJson = require('./Inserts');

var barcode = "A0A3B820690F";
var shelving = "ABC";
var collectionFk = '254';

var consultaSql1 = [
    {
        id: 1025963,
        ticketFk: 2516988,
        level: 1,//en un futur no estaran
        wagon: 0,//en un futur no estaran
        nickname: 'FLORA&CO',
        agencyModeFk: 'MRW',//Seria un numero  
    },
    {
        id: 1025964,
        ticketFk: 2542131,
        level: 2,
        wagon: 0,
        nickname: 'MORRIS',
        agencyModeFk: 'MRW'//Seria un numero
    },
    {
        id: 1025965,
        ticketFk: 2542131,
        level: 3,
        wagon: 0,
        nickname: 'MORRIS2',
        agencyModeFk: 'MRW'
    }
]

function ticketCollection(){//parametro collectionFk
    /// CONSULTA SQL PER A TINDRE ELS DIFERENTS ticketsColletion DE UN colletionFK (consiltaSql1) ///
    /// CONSULTA SQL PER A CADA ticket DE CADA ticketCollection (consiltaSql2) ///
    insertJson.insertJson(consultaSql1, shelving)
}

ticketCollection();