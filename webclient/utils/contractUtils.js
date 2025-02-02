import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const abi = [
   "event DonationReceived(uint256 campaignId, address indexed donor, uint256 amount)",
   "function donate(uint256 campaignId) payable",
   "function createCampaign(string title, string description, uint256 totalTarget, uint256 deadline) public",
   "function getCampaigns() view returns ((address creator, string title, string description, uint256 totalTarget, uint256 totalFunds, bool isCompleted, uint256 deadline, string proofOfFundUse, bool proofSubmitted, address[] donors, string[] photos)[])",
];

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
const contract = new ethers.Contract(contractAddress, abi, provider);

export default contract;
