const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");

// generating key pairs
const bob = nacl.box.keyPair();
const alice = nacl.box.keyPair();

// bob precomputes shared key with alice
const sharedKey = nacl.box.before(alice.publicKey, bob.secretKey);

// generate one time nonce
const nonce = nacl.randomBytes(24);

// bob encrypts message for alice
const box = nacl.box.after(
    nacl.util.decodeUTF8('Hello Alice'),
    nonce,
    sharedKey
);

// message to be sent
const message = {box, nonce};

// alice precomputes key with bob
const newSharedKey = nacl.box.before(bob.publicKey, alice.secretKey);

const payload = nacl.box.open.after(
    message.box,
    message.nonce,
    newSharedKey
);

console.log(nacl.util.encodeUTF8(payload));