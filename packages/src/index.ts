
import * as ethers from 'ethers';
import { createPXEClient, getSandboxAccountsWallets, Contract, Fr } from '@aztec/aztec.js';
import {TokenBridgeContract} from './utils/TokenBridge.js';
import { deployContract } from './utils/l1_contracts.js';

const { SANDBOX_URL = 'http://localhost:8080' } = process.env;

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let signer = ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    signer = await signer.connect(provider);
    const tokenPortal = await deployContract(signer, "TokenPortal");
    console.log(`l1 contract deployed to ${tokenPortal.address}`);

    const client = createPXEClient(SANDBOX_URL);
    const [ownerWallet] = await getSandboxAccountsWallets(client);
    const ownerAddress = ownerWallet.getAddress();
    console.log("aztec owner address", ownerAddress.toString());

    const accounts = await client.getRegisteredAccounts();
    await console.log(accounts);

    const deployerWallet = accounts[0];
    const salt = Fr.random();

    const tx = TokenBridgeContract.deploy(client).send({ contractAddressSalt: salt });
    console.log(`Tx sent with hash ${await tx.getTxHash()}`);

    await tx.isMined({ interval: 0.1 });
    const receiptAfterMined = await tx.getReceipt();
    console.log(`Status: ${receiptAfterMined.status}`);
    console.log(`Contract address: ${receiptAfterMined.contractAddress}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});