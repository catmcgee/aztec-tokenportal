import * as ethers from 'ethers';
import { createPXEClient, getSandboxAccountsWallets, Fr } from '@aztec/aztec.js';
import { TokenBridgeContract } from './utils/TokenBridge.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9wYWNrYWdlcy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUIsRUFBWSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsTUFBTSxFQUFFLFdBQVcsR0FBRyx1QkFBdUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFOUQsS0FBSyxVQUFVLElBQUk7SUFDZixpQ0FBaUM7SUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9FLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLDZEQUE2RCxDQUFDLENBQUM7SUFDdkcsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV4QyxnQkFBZ0I7SUFFaEIsTUFBTSxhQUFhLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUVsRCxzQkFBc0I7SUFFdEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXhELE1BQU0sV0FBVyxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sRUFBRSxhQUFhLENB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