const { buildModule } = require("@nomicfoundation/ignition-core");

const Deploy = buildModule("Deploy", (m) => {
  const crowdfunding = m.contract("Crowdfunding");

  return { crowdfunding };
});

module.exports = Deploy;
