"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var keypair = web3_js_1.Keypair.generate();
console.log("Public key ".concat(keypair.publicKey.toBase58()));
console.log("Private key ".concat(keypair.secretKey));
