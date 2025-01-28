const express = require("express");
const router = express.Router();
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/authUtils");
const db = require("../config").db;

// REGIST
router.post("/register", (req, res) => {
  const { name, email, password, tier } = req.body;

  if (!name || !email || !password || !tier) {
    return res.status(400).json({ error: "All fields are required" });
  }

  hashPassword(password)
    .then((hashedPassword) => {
      const stmt = db.prepare(
        "INSERT INTO users (name, email, password, tier) VALUES (?, ?, ?, ?)"
      );
      stmt.run(name, email, hashedPassword, tier, function (err) {
        if (err) {
          return res.status(500).json({ error: "Failed to register user" });
        }
        res.status(201).json({
          message: "User registered successfully",
          userId: this.lastID,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error hashing password" });
    });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    comparePassword(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user.id, user.email);
        res.status(200).json({ message: "Login successful", token });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Error checking password" });
      });
  });
});

module.exports = router;
