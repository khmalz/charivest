const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const db = require("../config").db;

// USER PROFILE
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.userId;

  db.get(
    "SELECT id, name, email, tier FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching user data" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    }
  );
});

// GET ALL USERS
router.get("/users", verifyToken, (req, res) => {
  db.all("SELECT id, name, email, tier FROM users", (err, users) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching users data" });
    }

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json(users);
  });
});

module.exports = router;
