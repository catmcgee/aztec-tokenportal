# Sandbox Initialisation for L1<>L2

## Packages:
* l1-contracts - a JS Hardhat project
* aztec-contracts - a nargo project
* src - mjs files that we can run against the sandbox

## Prerequisites
* node v18+
* docker
* Installed aztec sandbox
* Nargo

## Installation
* Run `yarn install` in `packages/src`
* Run `yarn install` in `packages/l1-contracts`

## Compile L1 contracts
```sh
cd packages/l1-contracts
npx hardhat compile
```

## Compile aztec contracts
```sh
cd packages/aztec-contracts
aztec-cli compile PACKAGE_NAME
```

## Running
* Run the sandbox:
```sh
cd ~/.aztec && docker-compose up
```

In a separate terminal
```sh
cd YOUR_REPO/packages/src
node index.mjs
```
