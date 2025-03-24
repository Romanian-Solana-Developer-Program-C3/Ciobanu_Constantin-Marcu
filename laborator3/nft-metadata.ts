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

const umi = createUmi(clusterApiUrl('devnet'))
const kp = getKeypairFromEnvironment('SECRET_KEY')

let keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey)
const signer = createSignerFromKeypair(umi, keypair)

umi.use(irysUploader())
umi.use(signerIdentity(signer))

const METADATA_FILE = './nft-metadata.json'

async function uploadMetadata() {
	try {
		console.log('Uploading metadata...')
		const metadataContent = await readFile(METADATA_FILE, 'utf8')
		const metadataFile = createGenericFile(
			new TextEncoder().encode(metadataContent),
			'application/json'
		)

		const [metadataUri] = await umi.uploader.upload([metadataFile])
		console.log('Metadata uploaded to:', metadataUri)
		return metadataUri
	} catch (e) {
		console.error('Error uploading metadata:', e)
	}
}

uploadMetadata()
