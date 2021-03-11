const crypto = require('crypto');
const got = require('got');
const config = require('./config');

const encryptPassword = async(password) => {
        const { body } = await got.get('http://app.etiquetaselectronicas.com:9999/user/getErpPublicKey', {
        });
        const publicKey=`-----BEGIN PUBLIC KEY-----\n${JSON.parse(body).data}\n-----END PUBLIC KEY-----`;
        const externKey = { 
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING 
        };
        let buffer = Buffer.from(password);
        return crypto.publicEncrypt(externKey, buffer).toString("base64");
};

exports.encryptPassword = encryptPassword;
//HOLA