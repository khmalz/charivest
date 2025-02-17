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
      const title = "Kampanye Kocak";
      const description = "Kampanya untuk orang kocak";
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], [title, deadline]));

      const tx = await crowdfunding.createCampaign(id, title, description, totalTarget, deadline, photos);
      await tx.wait();

      const campaigns = await crowdfunding.getCampaigns();
      expect(campaigns.length).to.equal(1);
      expect(campaigns[0].id).to.equal(id);
      expect(campaigns[0].title).to.equal(title);
      expect(campaigns[0].description).to.equal(description);
      expect(campaigns[0].photos).to.deep.equal(photos);
   });

   it("donate to a campaign", async function () {
      const title = "Kampanye Hebat";
      const description = "Untuk misi sosial";
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], [title, deadline]));

      await crowdfunding.createCampaign(id, title, description, totalTarget, deadline, photos);

      const donationAmount = ethers.parseEther("0.5");
      await crowdfunding.connect(addr1).donate(id, { value: donationAmount });

      const campaigns = await crowdfunding.getCampaigns();
      expect(campaigns[0].totalFunds).to.equal(donationAmount);
   });

   it("mark a campaign as completed when reach the target", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      await crowdfunding.connect(addr1).donate(id, {
         value: ethers.parseEther("1.0"),
      });

      const campaigns = await crowdfunding.getCampaigns();
      expect(campaigns[0].isCompleted).to.equal(true);
   });

   it("allow proof submission by creator after completion", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      await crowdfunding.connect(addr1).donate(id, {
         value: ethers.parseEther("1.0"),
      });

      const proofURI = "https://example.com/proof";
      await crowdfunding.submitProofOfFundUse(id, proofURI);

      const campaignDetails = await crowdfunding.getDetailCampaign(id);
      expect(campaignDetails.proofOfFundUse).to.equal(proofURI);
   });

   it("should be able to withdraw", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      const donationAmount = ethers.parseEther("1.0");
      await crowdfunding.connect(addr1).donate(id, { value: donationAmount });

      await crowdfunding.connect(deployer).withDraw(id);

      const campaignDetails = await crowdfunding.getDetailCampaign(id);
      expect(campaignDetails.totalFunds).to.equal(0);
      expect(campaignDetails.isWithdrawn).to.equal(true);
   });

   it("revert if withdrawal is called by non-creator", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      const donationAmount = ethers.parseEther("0.5");
      await crowdfunding.connect(addr1).donate(id, { value: donationAmount });

      await expect(crowdfunding.connect(addr1).withDraw(id)).to.be.revertedWith("Only creator");
   });

   it("return reward points", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      const donationAmount = ethers.parseEther("0.5");
      await crowdfunding.connect(addr1).donate(id, { value: donationAmount });

      const rewardPoints = await crowdfunding.getRewardPoints(addr1.address);
      const expectedRewardPoints = BigInt(donationAmount) / BigInt(10);

      expect(rewardPoints).to.equal(expectedRewardPoints);
   });

   it("revert donation for campaign not found", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("random_fake_id"));
      await expect(crowdfunding.connect(addr1).donate(fakeId, { value: ethers.parseEther("0.5") })).to.be.revertedWith("Campaign not found");
   });

   it("revert if donation is zero", async function () {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", ethers.parseEther("1.0"), deadline, photos);

      await expect(crowdfunding.connect(addr1).donate(id, { value: 0 })).to.be.revertedWith("Donation must be greater than zero");
   });

   it("revert if proof submitted after deadline", async function () {
      const totalTarget = ethers.parseEther("1.0");
      const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const photos = [];
      const id = ethers.keccak256(ethers.solidityPacked(["string", "uint256"], ["Test", deadline]));

      await crowdfunding.createCampaign(id, "Test", "Test", totalTarget, deadline, photos);

      await crowdfunding.connect(addr1).donate(id, {
         value: ethers.parseEther("1.0"),
      });

      const proofURI = "https://example.com/proof";
      const provider = ethers.provider;

      await provider.send("evm_setNextBlockTimestamp", [Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31]);
      await provider.send("evm_mine");

      await expect(crowdfunding.submitProofOfFundUse(id, proofURI)).to.be.revertedWith("Proof submission period has ended");
   });
});
