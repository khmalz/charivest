import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  "event DonationReceived(uint256 campaignId, address indexed donor, uint256 amount)",
];

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const contract = new ethers.Contract(contractAddress, abi, provider);

export default contract;
