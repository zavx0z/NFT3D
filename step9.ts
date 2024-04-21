import { getHttpEndpoint } from "@orbs-network/ton-access"
import { mnemonicToWalletKey } from "@ton/crypto"
import { TonClient, WalletContractV4, internal } from "@ton/ton"

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = process.env.mnemonic as string
  const key = await mnemonicToWalletKey(mnemonic.split(" "))
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 })

  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" })
  console.log("endpoint:", endpoint)
  const client = new TonClient({ endpoint })
//   console.log("client:", client)
  // make sure wallet is deployed
  if (!(await client.isContractDeployed(wallet.address))) {
    return console.log("wallet is not deployed")
  }
//   console.log("wallet:", wallet)
  const walletContract = client.open(wallet)
//   console.log("walletContract:", walletContract)
  const seqno = await walletContract.getSeqno()
  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: "kQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLaXU",
        value: "0.05", // 0.05 TON
        body: "Hello", // optional comment
        bounce: false,
      }),
    ],
  })

  // wait until confirmed
//   console.log("seqno:", seqno)
  let currentSeqno = seqno
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...")
    await sleep(1500)
    currentSeqno = await walletContract.getSeqno()
  }
  console.log("transaction confirmed!")
}

main()

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
