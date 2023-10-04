import * as ethers from 'ethers';
import * as fs from 'fs';
import { monitorEventLoopDelay } from 'perf_hooks';

const PATH = "../../packages/l1-contracts/artifacts/contracts";
const EXT = ".sol"

function pathToArtifact(contractName) {
    return `${PATH}/${contractName}${EXT}/${contractName}.json`;
}

export async function deployContract(signer, contractName, ...args) {
    const artifact = JSON.parse(fs.readFileSync(pathToArtifact(contractName)).toString());
    const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    return await contract.deploy(args);
}