
// ------------------------- IMPORTS --------------------------

const CryptoJS = require('crypto-js'); // crypto module
require('dotenv').config(); // DotEnv, module used for crypto js key ...


// ============================================================
// ------------------------- Variables --------------------------

const emailCryptoKey = CryptoJS.enc.Base64.parse(process.env.EMAIL_CRYPTO_KEY); // ! length=22 ! see Crypto.AES =>  If you use a passphrase, then use AES-256 ( 256-bit key).
const emailIV = CryptoJS.enc.Base64.parse(emailCryptoKey.toString()); // can be changed to own IV


// ---------------------- Crypto functions -------------------------

const encryptEmail = email => {

    let cipher = CryptoJS.AES.encrypt(email, emailCryptoKey, { iv: emailIV });
    return cipher.toString();
}

// Can be used to show email if needed
const decryptEmail = cryptedEmail => {

    let decipher = CryptoJS.AES.decrypt(cryptedEmail, emailCryptoKey, { iv: emailIV });
    return decipher.toString(CryptoJS.enc.Utf8);
}


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { encryptEmail, decryptEmail };