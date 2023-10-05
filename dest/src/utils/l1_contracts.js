import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
const ROOT = process.cwd(); // This gets the project root directory path
const PATH_TO_CONTRACTS_RELATIVE = "./packages/l1-contracts/artifacts/contracts";
const EXT = ".sol";
function pathToArtifact(contractName) {
    const relativePath = `${PATH_TO_CONTRACTS_RELATIVE}/${contractName}${EXT}/${contractName}.json`;
    const absolutePath = path.resolve(ROOT, relativePath);
    return absolutePath;
}
export async function deployContract(signer, contractName, ...args) {
    const absoluteArtifactPath = pathToArtifact(contractName);
    const artifact = JSON.parse(fs.readFileSync(absoluteArtifactPath, 'utf-8'));
    const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    return await contract.deploy(...args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfY29udHJhY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFja2FnZXMvc3JjL3V0aWxzL2wxX2NvbnRyYWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUc3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7QUFDeEUsTUFBTSwwQkFBMEIsR0FBRyw2Q0FBNkMsQ0FBQztBQUNqRixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUE7QUFFbEIsU0FBUyxjQUFjLENBQUMsWUFBb0I7SUFDeEMsTUFBTSxZQUFZLEdBQUcsR0FBRywwQkFBMEIsSUFBSSxZQUFZLEdBQUcsR0FBRyxJQUFJLFlBQVksT0FBTyxDQUFDO0lBQ2hHLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRXRELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsWUFBb0IsRUFBRSxHQUFHLElBQVc7SUFDckYsTUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVyRixPQUFPLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUMifQ==