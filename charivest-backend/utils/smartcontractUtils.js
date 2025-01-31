const Web3 = require("web3");
require("dotenv").config();

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.PROVIDER_URL)
);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "CampaignCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DonationReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proofOfFundUse",
        type: "string",
      },
    ],
    name: "ProofSubmitted",
    type: "event",
  },
  {
    inputs: [],
    name: "PROOF_DEADLINE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalTarget",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalTarget",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFunds",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "proofOfFundUse",
            type: "string",
          },
          {
            internalType: "bool",
            name: "proofSubmitted",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "donors",
            type: "address[]",
          },
        ],
        internalType: "struct Crowdfunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "getDetailCampaign",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalTarget",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFunds",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isCompleted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "proofOfFundUse",
        type: "string",
      },
      {
        internalType: "bool",
        name: "proofSubmitted",
        type: "bool",
      },
      {
        internalType: "address[]",
        name: "donors",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getRewardPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "proofURI",
        type: "string",
      },
    ],
    name: "submitProofOfFundUse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

const privateKey = process.env.PRIVATE_KEY;

async function createCampaign(title, description, totalTarget, deadline) {
  const data = contract.methods
    .createCampaign(title, description, totalTarget, deadline)
    .encodeABI();

  const accounts = await web3.eth.getAccounts();
  const senderAddress = accounts[0];

  const tx = {
    from: senderAddress,
    to: contractAddress,
    data,
    gas: 2000000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(
    `Campaign created with transaction hash: ${receipt.transactionHash}`
  );
  return receipt;
}

async function donateToCampaign(campaignId, donationAmount) {
  const data = contract.methods.donate(campaignId).encodeABI();
  const accounts = await web3.eth.getAccounts();
  const senderAddress = accounts[0];

  const tx = {
    from: senderAddress,
    to: contractAddress,
    data,
    value: web3.utils.toWei(donationAmount.toString(), "ether"),
    gas: 2000000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(
    `Donation made with transaction hash: ${receipt.transactionHash}`
  );
  return receipt;
}

async function getRewardPoints(userAddress) {
  const rewardPoints = await contract.methods
    .getRewardPoints(userAddress)
    .call();
  console.log(`Reward points for ${userAddress}: ${rewardPoints}`);
  return rewardPoints;
}

module.exports = { createCampaign, donateToCampaign, getRewardPoints };
