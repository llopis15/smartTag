const express = require('express');
const got = require('got');
const config = require('./config');
const encrypt = require('./encrypted');
const app = express();
const port = 9999;

app.get('/', async(req, res) => {
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
                    itemList: [{
                            attrCategory: "default",
                            attrName: "default",
                            barCode: "1000012345",
                            itemTitle: "Australian apple",
                            originalPrice: "600",
                            price: "6300",
                            productArea: "Britain",
                            productCode: "4151512414155",
                            productSku: "200001275",
                        },
                        {
                            attrCategory: "default",
                            attrName: "default",
                            barCode: "5141415414312",
                            itemTitle: "Cavendish banana",
                            originalPrice: "10",
                            price: "8",
                            productArea: "Brasil",
                            productCode: "4151512414156",
                            productSku: "20001536",
                            promotionText: "sale"
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