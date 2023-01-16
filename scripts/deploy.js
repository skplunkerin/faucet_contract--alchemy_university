require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  let artifacts = await hre.artifacts.readArtifact("Faucet");
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.TESTNET_ALCHEMY_RPC_URL
  );
  let wallet = new ethers.Wallet(
    process.env.TESTNET_WALLET_PRIVATE_KEY,
    provider
  );

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let faucet = await factory.deploy();

  console.log("Faucet address:", faucet.address);

  await faucet.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
