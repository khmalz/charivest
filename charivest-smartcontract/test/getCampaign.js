const { ethers } = require("hardhat");

async function main() {
  const CrowdfundingFactory = await ethers.getContractFactory("Crowdfunding");

  const Crowdfunding = await CrowdfundingFactory.attach(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  try {
    const campaigns = await Crowdfunding.getCampaigns();

    console.log(campaigns);
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
