require("@nomicfoundation/hardhat-ignition");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
};
