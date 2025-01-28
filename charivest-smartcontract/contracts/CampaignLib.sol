// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.28;

// import "./MilestoneLib.sol";

// library CampaignLib {
//     using MilestoneLib for MilestoneLib.Milestone;

//     struct Campaign {
//         address creator;
//         string title;
//         string description;
//         uint256 totalTarget;
//         uint256 totalFunds;
//         bool isCompleted;
//         uint256 milestoneCount;
//         mapping(uint256 => MilestoneLib.Milestone) milestones;
//     }

//     function updateMilestones(Campaign storage campaign) internal {
//         for (uint256 i = 0; i < campaign.milestoneCount; i++) {
//             uint256 milestoneTarget = (campaign.totalTarget *
//                 campaign.milestones[i].percentage) / 100;
//             if (
//                 campaign.totalFunds >= milestoneTarget &&
//                 !campaign.milestones[i].isCompleted
//             ) {
//                 campaign.milestones[i].isCompleted = true;
//             }
//         }

//         // Periksa apakah milestone terakhir sudah selesai
//         if (campaign.milestones[campaign.milestoneCount - 1].isCompleted) {
//             campaign.isCompleted = true;
//         }
//     }

//     function addMilestone(
//         Campaign storage campaign,
//         uint256 percentage
//     ) internal {
//         require(
//             percentage > 0 && percentage <= 100,
//             "Invalid milestone percentage"
//         );
//         campaign.milestones[campaign.milestoneCount] = MilestoneLib.Milestone({
//             percentage: percentage,
//             isCompleted: false
//         });
//         campaign.milestoneCount++;
//     }
// }
