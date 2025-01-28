const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const db = require("./db");

module.exports = {
  express,
  bcrypt,
  jwt,
  bodyParser,
  db,
  port: 3000,
  JWT_SECRET: "mrepscharivest",
};
