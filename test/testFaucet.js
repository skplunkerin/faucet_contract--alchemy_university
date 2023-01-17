const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("Faucet", function () {
  // This fixture will be re-run in every test to setup the contract.
  // Using loadFixture() to run this will create a snapshot of the contract
  // state and reset the Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Faucet = await ethers.getContractFactory("Faucet");
    // deploy the faucet with starting 2 ETH balance so the withdraw() functions
    // actually work.
    const faucet = await Faucet.deploy({
      value: ethers.utils.parseUnits("2", "ether"),
    });
    const maxWithdrawAmount = ethers.utils.parseUnits(".1", "ether");

    // console.log("Contract address :", faucet.address);
    // console.log("Owner address :", owner.address);
    // console.log(
    //   "Contract balance:\n",
    //   (await ethers.provider.getBalance(faucet.address))
    //     .toBigInt()
    //     .toLocaleString("en-US")
    // );
    // console.log(
    //   "Owner balance:\n",
    //   (await ethers.provider.getBalance(owner.address))
    //     .toBigInt()
    //     .toLocaleString("en-US")
    // );
    // console.log(
    //   "Other account balance:\n",
    //   (await ethers.provider.getBalance(owner.address))
    //     .toBigInt()
    //     .toLocaleString("en-US")
    // );
    // console.log("Other address:", otherAccount.address);

    return { faucet, owner, otherAccount, maxWithdrawAmount };
  }

  it("should set the owner correctly from the constructor", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("withdraw() should send only .1 ETH", async function () {
    const { faucet, owner, otherAccount, maxWithdrawAmount } =
      await loadFixture(deployContractAndSetVariables);
    // revert when withdraw amount is too high
    const withdrawAmount = ethers.utils.parseUnits("1", "ether");
    await expect(faucet.connect(otherAccount).withdraw(withdrawAmount)).to.be
      .reverted;

    // TODO: how to make the BigNumber negative? none of the below works:
    //   maxWithdrawAmount * -1
    //   maxWithdrawAmount.times(-1)
    //   BigNumber(maxWithdrawAmount).times(-1)
    const negativeMaxWithdrawAmount = ethers.utils.parseUnits("-.1", "ether");
    // to just check the balance changing to the contract or address:
    // await expect(
    //   faucet.connect(otherAccount).withdraw(maxWithdrawAmount)
    // ).to.changeEtherBalance(faucet, negativeMaxWithdrawAmount);
    await expect(
      faucet.connect(otherAccount).withdraw(maxWithdrawAmount)
    ).to.changeEtherBalances(
      [faucet, otherAccount],
      [negativeMaxWithdrawAmount, maxWithdrawAmount]
    );
  });

  it("should restrict destroyFaucet() to the owner via the onlyOwner modifier", async function () {
    const { faucet, owner, otherAccount } = await loadFixture(
      deployContractAndSetVariables
    );

    // another address can't call destroyFaucet()
    await expect(faucet.connect(otherAccount).destroyFaucet()).to.be.reverted;

    // the owner can call destroyFaucet()
    await expect(faucet.connect(owner).destroyFaucet());
    let bytecode = await ethers.provider.getCode(faucet.address);
    expect(bytecode).equal("0x");
  });

  // TODO: Test the following:
  // it("should restrict withdrawAll() to the owner via the onlyOwner modifier", async function () {
  //   const { faucet, owner, otherAccount } = await loadFixture(
  //     deployContractAndSetVariables
  //   );
  // });
  // it("destroyFaucet() should send all funds to the owner", async function () {
  //   const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
  // });
  // it("withdrawAll() should send all funds to the owner", async function () {
  //   const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
  // });
});
