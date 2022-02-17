const signer = require('nacl-signature');
const nacl = require('tweetnacl');
nacl.util = require("tweetnacl-util");

const keyPair = nacl.sign.keyPair();

const secretKey = keyPair.secretKey;
const publicKey = keyPair.publicKey;

const signature = signer.sign('NaCL is amazing!', secretKey);

if(signer.verify('NaCL is amazing!', signature, publicKey)) {
    console.log('Signature is valid!');
} else {
    console.log('Signature is NOT VALID.');
}
