const express = require("express");
const router = express.Router();
const db = require("../config").db;

// ADD DOCUMENT
router.post("/add-document", (req, res) => {
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
      res
        .status(201)
        .json({
          message: "Document added successfully",
          documentId: this.lastID,
        });
    }
  );
});

// GET USER DOCUMENT
router.get("/documents/:userId", (req, res) => {
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

module.exports = router;
