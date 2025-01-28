const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const CrowdfundingFactory = await ethers.getContractFactory("Crowdfunding");
  const Crowdfunding = await CrowdfundingFactory.deploy();

  await Crowdfunding.deployed();

  const tx = await Crowdfunding.createCampaign(
    "Kampanye Kocak",
    "Penggalangan dana untuk orang kocak",
    1000
  );

  console.log("Kampanye berhasil dibuat:", tx);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
