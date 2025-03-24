import 'dotenv/config'
import { readFile } from 'fs/promises'
import {
	createGenericFile,
	createSignerFromKeypair,
	signerIdentity,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { clusterApiUrl } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'

async function uploadImage() {
	try {
		console.log('Uploading image...')

		const umi = createUmi(clusterApiUrl('devnet'))
		const kp = getKeypairFromEnvironment('SECRET_KEY')
		let keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
		const signer = createSignerFromKeypair(umi, keypair)

		umi.use(irysUploader())
		umi.use(signerIdentity(signer))

		const IMG_FILE = './nft-image.png'

		// Read the image file
		const img = await readFile(IMG_FILE)
		const imgConverted = createGenericFile(new Uint8Array(img), 'image/png')

		const [myUri] = await umi.uploader.upload([imgConverted])
		console.log('Image uploaded successfully to:', myUri)
		return myUri
	} catch (e) {
		console.error('Error uploading image:', e)
	}
}

uploadImage()
