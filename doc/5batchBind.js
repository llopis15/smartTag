const express = require('express');
const got = require('got');
const config = require('./config');
const encrypt = require('./encrypted');
const app = express();
const port = 9999;

app.get('/', async(req, res) => {
    (async() => {
        const info = await config.info
        let key = info.data.token;

        (async() => {
            const { body } = await got.post('http://app.etiquetaselectronicas.com:9999/bind/batchBind', {
                json: {
                    storeId: config.storeId,
                    tagItemBinds: [{
                            eslBarcode: "A0A3B8207222",
                            itemBarcode: "100001234"
                        },
                        {
                            eslBarcode: "A0A3B820690F",
                            itemBarcode: "5141415414312"
                        }
                    ]
                },
                responseType: 'json',
                headers: {
                    "Authorization": key
                }
            })
            console.log(body)
            res.end(JSON.stringify(body))
        })();
    })();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});