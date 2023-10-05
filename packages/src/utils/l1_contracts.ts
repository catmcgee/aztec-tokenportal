import * as ethers from 'ethers';
import { Signer } from 'ethers';
import * as fs from 'fs';
import * as path from 'path'; 
import { monitorEventLoopDelay } from 'perf_hooks';

const ROOT = process.cwd(); // This gets the project root directory path
const PATH_TO_CONTRACTS_RELATIVE = "./packages/l1-contracts/artifacts/contracts";
const EXT = ".sol"

function pathToArtifact(contractName: string) {
    const relativePath = `${PATH_TO_CONTRACTS_RELATIVE}/${contractName}${EXT}/${contractName}.json`;
    const absolutePath = path.resolve(ROOT, relativePath);
    
    return absolutePath;
}

export async function deployContract(signer: Signer, contractName: string, ...args: any[]) {
    const absoluteArtifactPath = pathToArtifact(contractName);
    const artifact = JSON.parse(fs.readFileSync(absoluteArtifactPath, 'utf-8')); 
    const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    
    return await contract.deploy(...args);
}
