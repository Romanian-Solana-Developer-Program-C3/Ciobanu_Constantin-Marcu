# Solana Laboratory 1

This repository contains my implementation of the first Solana laboratory assignments.

## Completed Steps

### 1. Generate Keypair

-   Successfully generated a new keypair
-   Public Key: `EA6NQkk83VTga6h594Ruy7iB3SXmovhLSvur5EwzLQWd`
-   Command used: `node generate-keypair.js`

### 2. Check Balance & Airdrop

-   Checked initial balance
-   Balance was below 5 SOL, triggered automatic airdrop
-   Successfully received 1 SOL from devnet faucet
-   Command used: `ts-node check-balance.ts`
-   Final balance: 1 SOL

### 3. Send SOL Transaction

-   Sent 0.01 SOL from wallet to recipient
-   Sender's address: `B2XrD7NeGS4ZShturH51b48ZmAmTuByu2BXaWYKWtgo2`
-   Recipient's address: `qbE2wbpMhPrqhTqLVU5yPCo4oNG7s9Ei5o84ZJe41p8`
-   Transaction signature: `28sAdV5neLWRaTvW6YPnfmZHuDP7PzHxXenfaFcvUzLG7ALUeWP4EPagbSxqV7ukCTbQBw1sCQikL3vtTzv1oj3M`
-   Command used: `ts-node send.ts`

### Final Balances

-   Sender's final balance: 0.989995 SOL
-   Recipient's final balance: 1.02 SOL

## Technical Details

-   Network: Solana Devnet
-   Environment: Node.js with TypeScript
-   Dependencies: @solana/web3.js, @solana-developers/helpers
