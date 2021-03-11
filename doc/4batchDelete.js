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
            const { body } = await got.delete('http://app.etiquetaselectronicas.com:9999/item/batchDeleteItem', {
                json: {
                    storeId: config.storeId,
                    list: [
                        "2000123456",
                        "5141415414312"
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