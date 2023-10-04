import * as ethers from 'ethers';
import { createPXEClient, getSandboxAccountsWallets } from '@aztec/aztec.js';
import { deployContract } from './utils/l1_contracts.js';
const { SANDBOX_URL = 'http://localhost:8080' } = process.env;
async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let signer = ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
    signer = await signer.connect(provider);
    const tokenPortal = await deployContract(signer, "TokenPortal");
    console.log(`deployed to ${tokenPortal.address}`);
    const client = createPXEClient(SANDBOX_URL);
    const [ownerWallet] = await getSandboxAccountsWallets(client);
    const ownerAddress = ownerWallet.getAddress();
    console.log("owner address", ownerAddress.toString());
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9wYWNrYWdlcy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUIsRUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUd6RCxNQUFNLEVBQUUsV0FBVyxHQUFHLHVCQUF1QixFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUU5RCxLQUFLLFVBQVUsSUFBSTtJQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMvRSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO0lBQ3ZHLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUdsRCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0seUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMifQ==