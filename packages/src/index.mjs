import * as ethers from 'ethers';
import { createAztecRpcClient, getSandboxAccountsWallets, Contract } from '@aztec/aztec.js';
import { deployContract } from './utils/l1_contracts.mjs';
import TokenBridgeContractAbi from '../aztec-contracts/token_bridge/target/TokenBridge.json' assert { type: "json" };

const { SANDBOX_URL = 'http://localhost:8080' } = process.env;

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let signer = ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    signer = await signer.connect(provider);
    const tokenPortal = await deployContract(signer, "TokenPortal");
    console.log(`deployed to ${tokenPortal.address}`);


    const client = createAztecRpcClient(SANDBOX_URL);
    const [ownerWallet] = await getSandboxAccountsWallets(client);
    const ownerAddress = ownerWallet.getAddress();
    console.log("owner address", ownerAddress.toString());
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});