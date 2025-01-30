// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./RewardPointsLib.sol";

contract Crowdfunding {
    using RewardPointsLib for uint256;

    address public admin;

    struct Campaign {
        address creator;
        string title;
        string description;
        uint256 totalTarget;
        uint256 totalFunds;
        bool isCompleted;
        uint256 deadline;
        string proofOfFundUse;
        bool proofSubmitted;
        address[] donors;
        string[] photos;
    }

    mapping(uint256 => Campaign) private campaigns;
    mapping(address => uint256) private rewardPoints;
    mapping(address => uint256) public totalDonations;
    mapping(uint256 => mapping(address => bool)) private hasDonated;

    uint256 public campaignCount;
    uint256 public constant PROOF_DEADLINE = 30 days;

    event CampaignCreated(uint256 campaignId, address indexed creator);
    event DonationReceived(
        uint256 campaignId,
        address indexed donor,
        uint256 amount
    );
    event CampaignCompleted(uint256 campaignId);
    event ProofSubmitted(uint256 campaignId, string proofOfFundUse);
    event PhotoAdded(uint256 campaignId, string photoURL);
    event RewardPointsGranted(address indexed donor, uint256 points);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can create campaigns");
        _;
    }

    function createCampaign(
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

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = msg.sender;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.totalTarget = totalTarget;
        newCampaign.isCompleted = false;
        newCampaign.deadline = deadline;
        newCampaign.photos = photos;

        emit CampaignCreated(campaignCount, msg.sender);
        campaignCount++;
    }

    function donate(uint256 campaignId) public payable {
        require(campaignId < campaignCount, "Invalid campaign ID");
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
        emit DonationReceived(campaignId, msg.sender, msg.value);
    }

    function submitProofOfFundUse(
        uint256 campaignId,
        string memory proofURI
    ) public {
        require(campaignId < campaignCount, "Invalid campaign ID");
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

    function addPhotoToCampaign(
        uint256 campaignId,
        string memory photoURL
    ) public {
        require(campaignId < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[campaignId];
        require(
            msg.sender == campaign.creator,
            "Only the creator can add photos"
        );

        campaign.photos.push(photoURL);

        emit PhotoAdded(campaignId, photoURL);
    }

    function getRewardPoints(address user) public view returns (uint256) {
        return rewardPoints[user];
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function getDetailCampaign(
        uint256 campaignId
    )
        public
        view
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 totalTarget,
            uint256 totalFunds,
            bool isCompleted,
            uint256 deadline,
            string memory proofOfFundUse,
            bool proofSubmitted,
            address[] memory donors,
            string[] memory photos
        )
    {
        require(campaignId < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.totalTarget,
            campaign.totalFunds,
            campaign.isCompleted,
            campaign.deadline,
            campaign.proofOfFundUse,
            campaign.proofSubmitted,
            campaign.donors,
            campaign.photos
        );
    }
}
