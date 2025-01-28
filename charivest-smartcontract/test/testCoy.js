const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding Contract", function () {
  let Crowdfunding, crowdfunding, deployer, addr1, addr2;

  beforeEach(async function () {
    [deployer, addr1, addr2] = await ethers.getSigners();
    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.deploy();
  });

  it("create a campaign", async function () {
    const title = "Kampanye Koca";
    const description = "Kampanya untuk orang kocak";
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const tx = await crowdfunding.createCampaign(
      title,
      description,
      totalTarget,
      deadline
    );
    await tx.wait();

    const campaigns = await crowdfunding.getCampaigns();
    expect(campaigns.length).to.equal(1);
    expect(campaigns[0].title).to.equal(title);
    expect(campaigns[0].description).to.equal(description);
  });

  it("donate to a campaign", async function () {
    const title = "Kampanye Hebat";
    const description = "Untuk misi sosial";
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    await crowdfunding.createCampaign(
      title,
      description,
      totalTarget,
      deadline
    );

    const donationAmount = ethers.parseEther("0.5");
    await crowdfunding.connect(addr1).donate(0, { value: donationAmount });

    const campaigns = await crowdfunding.getCampaigns();
    expect(campaigns[0].totalFunds).to.equal(donationAmount);
  });

  it("mark a campaign as completed when reach the target", async function () {
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    await crowdfunding.createCampaign("Test", "Test", totalTarget, deadline);

    await crowdfunding.connect(addr1).donate(0, {
      value: ethers.parseEther("1.0"),
    });

    const campaigns = await crowdfunding.getCampaigns();
    expect(campaigns[0].isCompleted).to.equal(true);
  });

  it("allow proof submission by creator after completion", async function () {
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    await crowdfunding.createCampaign("Test", "Test", totalTarget, deadline);

    await crowdfunding.connect(addr1).donate(0, {
      value: ethers.parseEther("1.0"),
    });

    const proofURI = "https://example.com/proof";
    await crowdfunding.submitProofOfFundUse(0, proofURI);

    const [, , , , , , , proofOfFundUse] = await crowdfunding.getDetailCampaign(
      0
    );
    expect(proofOfFundUse).to.equal(proofURI);
  });

  it("return reward points", async function () {
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    await crowdfunding.createCampaign("Test", "Test", totalTarget, deadline);

    const donationAmount = ethers.parseEther("0.5");
    await crowdfunding.connect(addr1).donate(0, { value: donationAmount });

    const rewardPoints = await crowdfunding.getRewardPoints(addr1.address);

    const expectedRewardPoints = BigInt(donationAmount) / BigInt(10);

    expect(rewardPoints).to.equal(expectedRewardPoints);
  });

  it("revert donation for invalid campaign ID", async function () {
    await expect(
      crowdfunding
        .connect(addr1)
        .donate(99, { value: ethers.parseEther("0.5") })
    ).to.be.revertedWith("Invalid campaign ID");
  });

  it("revert if donation is zero", async function () {
    await crowdfunding.createCampaign(
      "Test",
      "Test",
      ethers.parseEther("1.0"),
      Math.floor(Date.now() / 1000) + 60 * 60 * 24
    );

    await expect(
      crowdfunding.connect(addr1).donate(0, { value: 0 })
    ).to.be.revertedWith("Donation must be greater than zero");
  });

  it("revert if proof submitted after deadline", async function () {
    const totalTarget = ethers.parseEther("1.0");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    await crowdfunding.createCampaign("Test", "Test", totalTarget, deadline);

    await crowdfunding.connect(addr1).donate(0, {
      value: ethers.parseEther("1.0"),
    });

    const proofURI = "https://example.com/proof";

    const provider = ethers.provider;

    await provider.send("evm_setNextBlockTimestamp", [
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31,
    ]);
    await provider.send("evm_mine");

    await expect(
      crowdfunding.submitProofOfFundUse(0, proofURI)
    ).to.be.revertedWith("Proof submission period has ended");
  });
});
