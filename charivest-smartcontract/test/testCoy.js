const { ethers } = require("hardhat");

async function main() {
  const CrowdfundingFactory = await ethers.getContractFactory("Crowdfunding");
  const Crowdfunding = await CrowdfundingFactory.attach(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const tx = await Crowdfunding.createCampaign(
    "Kampanye Kocak",
    "Penggalangan dana untuk orang kocak",
    1000,
    [50, 50]
  );
  await tx.wait();
  console.log("Kampanye berhasil kocak!");

  const campaignCount = await Crowdfunding.campaignCount();
  console.log("Jumlah kampanye saat ini:", campaignCount.toString());

  const campaign = await Crowdfunding.campaigns(0);
  console.log("Detil Kampanye 0:");
  console.log("Judul:", campaign.title);
  console.log("Deskripsi:", campaign.description);
  console.log("Target Total:", campaign.totalTarget.toString());
  console.log("Jumlah Dana Terkumpul:", campaign.totalFunds.toString());
  console.log("Status Kampanye Selesai:", campaign.isCompleted);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
