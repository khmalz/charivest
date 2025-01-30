const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcrypt.hash(password, 10);
const comparePassword = (password, hash) => bcrypt.compare(password, hash);
const generateToken = (userId, email) =>
  jwt.sign({ userId, email }, "secret", { expiresIn: "1h" });

module.exports = { hashPassword, comparePassword, generateToken };
