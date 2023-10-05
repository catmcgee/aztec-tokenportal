
import * as ethers from 'ethers';
import { createPXEClient, getSandboxAccountsWallets, Contract, Fr } from '@aztec/aztec.js';
import {TokenBridgeContract} from './utils/TokenBridge.js';
import { deployContract } from './utils/l1_contracts.js';

const { SANDBOX_URL = 'http://localhost:8080' } = process.env;

async function main() {
    // deploy l1 tokenportal contract
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let signer = ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    signer = await signer.connect(provider);

    // get l1 signer

    const signerAddress = await signer.getAddress();
    console.log(`Signer's address: ${signerAddress}`);

    // deploy l1 contracts

    const token = await deployContract(signer, "PortalERC20");
    console.log(`l1 contract deployed to ${token.address}`);

    const tokenPortal = await deployContract(signer, "TokenPortal");
    console.log(`l1 contract deployed to ${tokenPortal.address}`);

    const registry = await deployContract(signer, "Registry");
    console.log(`Registry deployed to ${registry.address}`);

    const rollup = await deployContract(signer, "Rollup", registry.address);
    console.log(`Rollup deployed to ${rollup.address}`);

    const inbox = await deployContract(signer, "Inbox", registry.address);
    console.log(`Inbox deployed to ${inbox.address}`);
    
    const outbox = await deployContract(signer, "Outbox", registry.address);
    console.log(`Outbox deployed to ${outbox.address}`);

    // upgrade l1 registry
  
    await registry.upgrade(rollup.address, inbox.address, outbox.address);
    console.log(`Upgraded registry`);

    // TODO deploy l2 token (struggling with authwit)

    // const tx2 = TokenContract.deploy(client).send({ contractAddressSalt: salt });
    // console.log(`Tx sent with hash ${await tx.getTxHash()}`);
    // await tx2.isMined({ interval: 0.1 });
    // const receipt2 = await tx2.getReceipt();
    // console.log(`Token bridge contract address: ${receipt2.contractAddress}`);

    // await tokenPortal.initialize(registry.address, token.address, l2TokenAddress);
    // console.log(`TokenPortal initialized with ${rollup.address}`);

    // deploy l2 token bridge

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
    const receipt = await tx.getReceipt();
    console.log(`Token bridge contract address: ${receipt.contractAddress}`);

    // TODO: call initialize with token address 
    // const deployedContractAddress = receipt.contractAddress;
    // const tokenBridgeContract = await TokenBridgeContract.at(receipt.contractAddress, ownerWallet);
    // console.log(tokenBridgeContract)

    // const l2TokenAddressStruct = { address: l2TokenAddress };
    // await tokenBridgeContract.methods._initialize(l2TokenAddressStruct).send();
    
    // TODO: call some sort of l2<>l1 thing
    
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});