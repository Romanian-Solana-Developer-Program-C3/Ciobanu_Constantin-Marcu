import 'dotenv/config'
import {
	createGenericFile,
	createSignerFromKeypair,
	generateSigner,
	percentAmount,
	signerIdentity,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { clusterApiUrl } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
	createNft,
	mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'
import { base58 } from '@metaplex-foundation/umi/serializers'

const umi = createUmi(clusterApiUrl('devnet'))
const kp = getKeypairFromEnvironment('SECRET_KEY')

let keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
const signer = createSignerFromKeypair(umi, keypair)

umi.use(mplTokenMetadata())
umi.use(signerIdentity(signer))

const METADATA_URI =
	'https://gateway.irys.xyz/FQKYkanXVqeBr8iYqd72MVeVv2yVGdDWMepz2EXD8Wye'

async function createMyNFT() {
	try {
		const mint = generateSigner(umi)

		let tx = createNft(umi, {
			name: 'Robinhood',
			mint,
			authority: signer,
			isCollection: false,
			uri: METADATA_URI,
			sellerFeeBasisPoints: percentAmount(5),
		})

		let result = await tx.sendAndConfirm(umi)

		const signature = base58.deserialize(result.signature)
		console.log('NFT created successfully!')
		console.log('Mint address:', mint.publicKey)
		console.log('Transaction signature:', signature)
		console.log(
			`https://explorer.solana.com/address/${mint.publicKey}?cluster=devnet`
		)
		console.log(
			`https://explorer.solana.com/tx/${signature}?cluster=devnet`
		)
	} catch (e) {
		console.error('error uploading image: ', e)
	}
}
createMyNFT()
