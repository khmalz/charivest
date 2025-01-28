const express = require("express");
const router = express.Router();
const {
  createCampaign,
  donateToCampaign,
  getRewardPoints,
} = require("../utils/smartcontractUtils");

router.post("/createCampaign", async (req, res) => {
  const { title, description, totalTarget, deadline } = req.body;
  try {
    const receipt = await createCampaign(
      title,
      description,
      totalTarget,
      deadline
    );
    res
      .status(200)
      .send(
        `Campaign created successfully with hash: ${receipt.transactionHash}`
      );
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).send("Error creating campaign");
  }
});

router.post("/donate", async (req, res) => {
  const { campaignId, donationAmount } = req.body;
  try {
    const receipt = await donateToCampaign(campaignId, donationAmount);
    res
      .status(200)
      .send(`Donation successful with hash: ${receipt.transactionHash}`);
  } catch (error) {
    console.error("Error donating:", error);
    res.status(500).send("Error donating");
  }
});

router.get("/getRewardPoints/:userAddress", async (req, res) => {
  const { userAddress } = req.params;
  try {
    const rewardPoints = await getRewardPoints(userAddress);
    res.status(200).json({ rewardPoints });
  } catch (error) {
    console.error("Error getting reward points:", error);
    res.status(500).send("Error getting reward points");
  }
});

module.exports = router;
