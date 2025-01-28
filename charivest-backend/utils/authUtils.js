const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, config.JWT_SECRET, { expiresIn: "3h" });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
