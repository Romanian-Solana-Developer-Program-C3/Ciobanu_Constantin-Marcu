import 'dotenv/config'

import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import {
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	Signer,
	SystemProgram,
	Transaction,
	clusterApiUrl,
	sendAndConfirmTransaction,
} from '@solana/web3.js'

async function sendSol(
	amountSol: number,
	connection: Connection,
	sender: Keypair | Signer,
	recipientPublicKey: PublicKey
) {
	try {
		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: sender.publicKey,
				toPubkey: recipientPublicKey,
				lamports: amountSol * LAMPORTS_PER_SOL, // Convert SOL to lamports
			})
		)

		const signature = await sendAndConfirmTransaction(
			connection,
			transaction,
			[sender]
		)
		console.log(`Transaction successful! Signature: ${signature}`)
	} catch (error) {
		console.error('Error sending SOL:', error)
	}
}

async function main() {
	try {
		const senderkeypair = getKeypairFromEnvironment('SECRET_KEY')
		const connection = new Connection(clusterApiUrl('devnet'))
		const recipientkeypair = getKeypairFromEnvironment('SECRET_KEY_2')
		const recipientPublicKey = recipientkeypair.publicKey
		const senderPublicKey = senderkeypair.publicKey
		const originalSenderBalance =
			(await connection.getBalance(senderkeypair.publicKey)) /
			LAMPORTS_PER_SOL
		const originalRecipientBalance =
			(await connection.getBalance(recipientPublicKey)) / LAMPORTS_PER_SOL

		console.log(
			`Sender with address ${senderPublicKey} has balance ${originalSenderBalance}.`
		)
		console.log(
			`Recipient with address ${recipientPublicKey} has balance ${originalRecipientBalance}.`
		)

		await sendSol(0.01, connection, senderkeypair, recipientPublicKey)

		console.log('Transfer was successful!')

		const newSenderBalance =
			(await connection.getBalance(senderPublicKey)) / LAMPORTS_PER_SOL
		const newRecipientBalance =
			(await connection.getBalance(recipientPublicKey)) / LAMPORTS_PER_SOL

		console.log('New sender balance: ', newSenderBalance)
		console.log('New recipient balance: ', newRecipientBalance)
	} catch (e) {
		console.error('Error in main function: ', e)
	}
}

main()
