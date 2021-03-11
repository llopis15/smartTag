const express = require('express');
const got = require('got');
const app = express();
const port = 9999;

app.get('/', async(req, res) => {
    (async() => {
        const { body } = await got.get('http://app.etiquetaselectronicas.com:9999/user/getErpPublicKey', {
        });
        let body2=JSON.parse(body)
        console.log(body2.data)
        res.end(body);
    })();   
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});