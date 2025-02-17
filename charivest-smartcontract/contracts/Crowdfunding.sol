// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./RewardPointsLib.sol";

contract Crowdfunding {
    using RewardPointsLib for uint256;

    // admin = creator
    address payable public admin;

    struct Campaign {
        bytes32 id;
        address creator;
        string title;
        string description;
        uint256 totalTarget;
        uint256 totalFunds;
        bool isCompleted;
        bool isWithdrawn;
        uint256 deadline;
        string proofOfFundUse;
        bool proofSubmitted;
        address[] donors;
        string[] photos;
        uint256 createdAt;
    }

    mapping(bytes32 => Campaign) private campaigns;
    bytes32[] private campaignIds;
    bytes32[] private hasWithdrawn;

    mapping(address => uint256) private rewardPoints;
    mapping(address => uint256) public totalDonations;
    mapping(bytes32 => mapping(address => bool)) private hasDonated;

    uint256 public campaignCount;
    uint256 public constant PROOF_DEADLINE = 30 days;

    event CampaignCreated(bytes32 campaignId, address indexed creator);
    event DonationReceived(
        bytes32 campaignId,
        string title,
        address indexed donor,
        uint256 amount,
        uint256 donation_at
    );
    event CampaignCompleted(bytes32 campaignId);
    event CampaignWithdrawn(bytes32 campaignId, uint256 amount);
    event ProofSubmitted(bytes32 campaignId, string proofOfFundUse);
    event RewardPointsGranted(address indexed donor, uint256 points);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can create campaigns");
        _;
    }

    modifier onlyCreator(bytes32 id) {
        require(msg.sender == campaigns[id].creator, "Only creator");
        _;
    }

    modifier campaignExists(bytes32 id) {
        require(campaigns[id].creator != address(0), "Campaign not found");
        _;
    }

    constructor() {
        admin = payable(msg.sender);
    }

    function createCampaign(
        bytes32 id,
        string memory title,
        string memory description,
        uint256 totalTarget,
        uint256 deadline,
        string[] memory photos
    ) public onlyAdmin {
        require(bytes(title).length > 0, "Title is required");
        require(bytes(description).length > 0, "Description is required");
        require(totalTarget > 0, "Target must be greater than zero");
        require(deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[id];
        newCampaign.id = id;
        newCampaign.creator = msg.sender;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.totalTarget = totalTarget;
        newCampaign.isCompleted = false;
        newCampaign.isWithdrawn = false;
        newCampaign.deadline = deadline;
        newCampaign.photos = photos;

        emit CampaignCreated(id, msg.sender);
        campaignIds.push(id);
        campaignCount++;
    }

    function donate(
        bytes32 campaignId
    ) public payable campaignExists(campaignId) {
        require(msg.value > 0, "Donation must be greater than zero");

        Campaign storage campaign = campaigns[campaignId];
        require(!campaign.isCompleted, "Campaign already completed");
        require(block.timestamp <= campaign.deadline, "Campaign has ended");

        campaign.totalFunds += msg.value;
        totalDonations[msg.sender] += msg.value;

        if (!hasDonated[campaignId][msg.sender]) {
            campaign.donors.push(msg.sender);
            hasDonated[campaignId][msg.sender] = true;
        }

        if (campaign.totalFunds >= campaign.totalTarget) {
            campaign.isCompleted = true;
            rewardPoints[msg.sender] += campaign.totalFunds.bonusReward();
            emit CampaignCompleted(campaignId);
        }

        uint256 points = msg.value.calculateReward();
        rewardPoints[msg.sender] += points;

        emit RewardPointsGranted(msg.sender, points);
        emit DonationReceived(
            campaignId,
            campaign.title,
            msg.sender,
            msg.value,
            block.timestamp
        );
    }

    function withDraw(
        bytes32 campaignId
    ) public onlyCreator(campaignId) campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isCompleted, "Campaign must be completed first");

        uint256 amount = campaign.totalFunds;
        campaign.isWithdrawn = true;

        admin.transfer(amount);

        hasWithdrawn.push(campaignId);
        emit CampaignWithdrawn(campaignId, amount);
    }

    function submitProofOfFundUse(
        bytes32 campaignId,
        string memory proofURI
    ) public campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(
            msg.sender == campaign.creator,
            "Only campaign creator can submit proof"
        );
        require(campaign.isCompleted, "Campaign must be completed first");
        require(!campaign.proofSubmitted, "Proof already submitted");
        require(
            block.timestamp <= campaign.deadline + PROOF_DEADLINE,
            "Proof submission period has ended"
        );

        campaign.proofOfFundUse = proofURI;
        campaign.proofSubmitted = true;

        emit ProofSubmitted(campaignId, proofURI);
    }

    function getRewardPoints(address user) public view returns (uint256) {
        return rewardPoints[user];
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[campaignIds[i]];
        }
        return allCampaigns;
    }

    function getDetailCampaign(
        bytes32 campaignId
    ) public view campaignExists(campaignId) returns (Campaign memory) {
        return campaigns[campaignId];
    }
}
