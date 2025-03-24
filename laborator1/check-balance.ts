import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import 'dotenv/config'
import {
	airdropIfRequired,
	getKeypairFromEnvironment,
} from '@solana-developers/helpers'
import '@coral-xyz/anchor'

async function checkBalance() {
	const keypair = getKeypairFromEnvironment('SECRET_KEY')
	const conn = new Connection(clusterApiUrl('devnet'))

	const pubKey = keypair.publicKey
	console.log(`My Wallet address: ${pubKey.toBase58()}`)

	const balanceInLamports = await conn.getBalance(pubKey)
	console.log(`Balance in lamports: ${balanceInLamports}`)

	console.log(
		`💰 Address ${pubKey.toBase58()} has ${
			balanceInLamports / LAMPORTS_PER_SOL
		} SOL`
	)
}

await checkBalance()
