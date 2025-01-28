// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library RewardPointsLib {
    function calculateReward(
        uint256 donationAmount
    ) internal pure returns (uint256) {
        return (donationAmount * 10) / 100;
    }

    function bonusReward(uint256 totalFunds) internal pure returns (uint256) {
        return (totalFunds * 20) / 100;
    }
}
