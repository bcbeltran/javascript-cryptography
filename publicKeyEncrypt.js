const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

// generating key pairs
const alice = nacl.box.keyPair();
const bob = nacl.box.keyPair();

// generating one time nonce for encryption
const nonce = nacl.randomBytes(24);

// message for Alice
const utf8 = 'Hello Alice';

// bob encrypts message for Alice
const box = nacl.box(
    nacl.util.decodeUTF8(utf8),
    nonce,
    alice.publicKey,
    bob.secretKey
);

// send message to Alice
const message = {box, nonce};

// alice decrypts message from bob
const payload = nacl.box.open(message.box, message.nonce, bob.publicKey, alice.secretKey);
const UTF8 = nacl.util.encodeUTF8(payload);
console.log(UTF8);