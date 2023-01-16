# Activity: Deploy a Contract with Ethers.js + Hardhat

In this activity, we'll run through deploying a contract to the Göerli test
network. We will deploy a live ether faucet on Göerli - you can choose to deploy
any contract you'd like or customize the one below however you like! 🚰

It's great to get some practice in with leading web3 development like Hardhat,
let's jump in! 👨‍🔧👩‍🔧

> These activities are meant to teach you how to work more on your local.
> Setting up a local development environment is something that becomes extremely
> easy with a lot of practice! 🏋️‍

## Activity Requirements

- ~~[Apex](https://apexwallet.xyz/)~~: Browser extension wallet that provides key
  storage and secure account log-in as well as acts as a JSON-RPC gateway.

  - Using [MetaMask](https://metamask.io/) instead.

- [Alchemy](https://www.alchemy.com/): Alchemy is a blockchain development
  platform from which we will use some APIs to help query the Ethereum
  blockchain.

- [Hardhat](https://hardhat.org/): Ethereum developer suite full of tools that
  make the developer experience more efficient.

## Project setup:

1. `git clone`

2. `cp .env-sample .env` and update the ENV variable values

3. `npm run compile`

4. `npm run deploy_goerli`

### Goerli deployed smart contract

My [deployed contract](https://goerli.etherscan.io/address/0x094100Af680907A46415E53C444b98fBdfaEc195)
on the Goerli testnet.

> **NOTE:**
> I haven't tested that it works yet as to continue with the course, but unless
> the testnet is setup to pull ETH out of thin air, this is not a real faucet
> and will not work since there's no ETH balance on the contract for
> `withdraw()` to send ETH.

## Sample Hardhat Project

> Created from `npx hardhat`.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
