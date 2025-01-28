require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ignition");

module.exports = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/d07713dac8124d25ae5502968957d400`,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/d07713dac8124d25ae5502968957d400`,
      accounts: [process.env.PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [
        `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`,
      ],
    },
  },
};
