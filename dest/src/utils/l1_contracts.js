import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
const ROOT = process.cwd(); // This gets the project root directory path
const PATH_TO_CONTRACTS_RELATIVE = "./packages/l1-contracts/artifacts/contracts";
const EXT = ".sol";
function pathToArtifact(contractName) {
    // Generate the relative path first
    const relativePath = `${PATH_TO_CONTRACTS_RELATIVE}/${contractName}${EXT}/${contractName}.json`;
    // Now resolve it against the project root directory to get the absolute path
    const absolutePath = path.resolve(ROOT, relativePath);
    return absolutePath;
}
export async function deployContract(signer, contractName, ...args) {
    const absoluteArtifactPath = pathToArtifact(contractName);
    const artifact = JSON.parse(fs.readFileSync(absoluteArtifactPath, 'utf-8')); // Use 'utf-8' to return a string directly
    const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    return await contract.deploy(...args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfY29udHJhY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFja2FnZXMvc3JjL3V0aWxzL2wxX2NvbnRyYWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUc3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7QUFDeEUsTUFBTSwwQkFBMEIsR0FBRyw2Q0FBNkMsQ0FBQztBQUNqRixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUE7QUFFbEIsU0FBUyxjQUFjLENBQUMsWUFBb0I7SUFDeEMsbUNBQW1DO0lBQ25DLE1BQU0sWUFBWSxHQUFHLEdBQUcsMEJBQTBCLElBQUksWUFBWSxHQUFHLEdBQUcsSUFBSSxZQUFZLE9BQU8sQ0FBQztJQUNoRyw2RUFBNkU7SUFDN0UsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFdEQsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxZQUFvQixFQUFFLEdBQUcsSUFBVztJQUNyRixNQUFNLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztJQUN2SCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXJGLE9BQU8sTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyJ9