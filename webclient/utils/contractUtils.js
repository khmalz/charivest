import { ethers } from "ethers";
import crowdJson from "../abi/Crowdfunding.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
// const abi = [
//    "event DonationReceived(uint256 campaignId, address indexed donor, uint256 amount)",
//    "function donate(uint256 campaignId) payable",
//    "function createCampaign(string title, string description, uint256 totalTarget, uint256 deadline) public",
//    "function getCampaigns() view returns ((address creator, string title, string description, uint256 totalTarget, uint256 totalFunds, bool isCompleted, uint256 deadline, string proofOfFundUse, bool proofSubmitted, address[] donors, string[] photos)[])",
// ];

// const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
// const contract = new ethers.Contract(contractAddress, abi, provider);

let signer;
let provider;
let contract;

export const initializeContract = async () => {
   if (typeof window.ethereum !== "undefined") {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, crowdJson.abi, signer);

      return { provider, signer, contract };
   } else {
      alert("Please install MetaMask!");
      return {};
   }
};
