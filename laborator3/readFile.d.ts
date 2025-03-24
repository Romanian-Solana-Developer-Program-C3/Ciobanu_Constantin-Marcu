declare module 'fs/promises' {
	export function readFile(path: string): Promise<Buffer>
}
// Compare this snippet from node_modules/%40solana/web3.js/dist/index.d.ts:
