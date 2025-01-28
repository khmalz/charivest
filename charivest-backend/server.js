const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const JWT_SECRET = "raflygantengbangetjirlah";

// REGIST
app.post("/register", (req, res) => {
  const { name, email, password, tier } = req.body;

  if (!name || !email || !password || !tier) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    const stmt = db.prepare(
      "INSERT INTO users (name, email, password, tier) VALUES (?, ?, ?, ?)"
    );
    stmt.run(name, email, hashedPassword, tier, function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to register user" });
      }
      res
        .status(201)
        .json({ message: "User registered successfully", userId: this.lastID });
    });
  });
});

// LOGIN
app.post("/login", (req, res) => {
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

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Error checking password" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "3h" }
      );
      res.status(200).json({ message: "Login successful", token });
    });
  });
});

// PROFILE
app.get("/profile", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    const userId = decoded.userId;

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
});

// VERIFIKASI DATA
app.post("/verify-identity", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const stmt = db.prepare(
    "UPDATE users SET identity_verified = ? WHERE id = ?"
  );
  stmt.run(true, userId, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to verify identity" });
    }
    res.status(200).json({ message: "Identity verified successfully" });
  });
});

// GET USER
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(row);
  });
});

// ADD DOCUMENT
app.post("/add-document", (req, res) => {
  const { user_id, document_type, document_image, document_number } = req.body;

  if (!user_id || !document_type || !document_image || !document_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const stmt = db.prepare(
    "INSERT INTO documents (user_id, document_type, document_image, document_number) VALUES (?, ?, ?, ?)"
  );
  stmt.run(
    user_id,
    document_type,
    document_image,
    document_number,
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to add document" });
      }
      res.status(201).json({
        message: "Document added successfully",
        documentId: this.lastID,
      });
    }
  );
});

// GET DOCUMENT
app.get("/documents/:userId", (req, res) => {
  const { userId } = req.params;

  db.all("SELECT * FROM documents WHERE user_id = ?", [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching documents" });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No documents found for this user" });
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
