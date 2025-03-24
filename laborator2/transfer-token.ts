import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import {
	Connection,
	PublicKey,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,
	clusterApiUrl,
} from '@solana/web3.js'
import {
	TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	getAssociatedTokenAddress,
	createTransferInstruction,
} from '@solana/spl-token'
import 'dotenv/config'

const MINT = new PublicKey('EohKdkiKVRszgsKjrZR4dVzmCQfY8dvF3nKrK1LcEbRb')

async function main() {
	const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

	const payer = getKeypairFromEnvironment('SECRET_KEY')
	const sourceWallet = payer
	const destinationWallet = getKeypairFromEnvironment('SECRET_KEY_2')

	console.log(
		`Transfering token ${MINT} from ${sourceWallet.publicKey} to ${destinationWallet.publicKey}`
	)

	const sourceTokenAccount = await getAssociatedTokenAddress(
		MINT,
		sourceWallet.publicKey
	)
	console.log('Source token account:', sourceTokenAccount.toBase58())

	const destinationTokenAccount = await getAssociatedTokenAddress(
		MINT,
		destinationWallet.publicKey
	)
	console.log(
		'Destination token account:',
		destinationTokenAccount.toBase58()
	)
	// Check if destination token account exists
	const destinationAccountInfo = await connection.getAccountInfo(
		destinationTokenAccount
	)

	// Create transaction
	const transaction = new Transaction()

	// If destination account doesn't exist, create it
	if (!destinationAccountInfo) {
		console.log('Destination token account does not exist. Creating it...')
		transaction.add(
			createAssociatedTokenAccountInstruction(
				payer.publicKey, // Payer
				destinationTokenAccount, // Associated token account address
				destinationWallet.publicKey, // Owner of token account
				MINT // Token mint address
			)
		)
	}

	transaction.add(
		createTransferInstruction(
			sourceTokenAccount,
			destinationTokenAccount,
			sourceWallet.publicKey,
			1_000_000_000,
			[],
			TOKEN_PROGRAM_ID
		)
	)

	try {
		const signature = await sendAndConfirmTransaction(
			connection,
			transaction,
			[payer, sourceWallet].filter(
				(item, pos, self) =>
					self.findIndex((t) =>
						t.publicKey.equals(item.publicKey)
					) === pos
			)
		)
		console.log(`✅ Success! Transaction signature: ${signature}`)
		console.log(
			`https://explorer.solana.com/tx/${signature}?cluster=devnet`
		)
	} catch (error) {
		console.error('Error:', error)
	}
}

main()
