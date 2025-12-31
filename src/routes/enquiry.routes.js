import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Create enquiry
router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql =
    "INSERT INTO enquiries (name, email, phone, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, message], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Enquiry submitted successfully" });
  });
});

// Get all enquiries (Admin)
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM enquiries ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json(results);
    }
  );
});
// 2. DELETE ENQUIRY - Kisi specific enquiry ko delete karne ke liye

router.delete("/:id", (req, res) => {
  const { id } = req.params; // ID ko extract kiya

  // "?" ka use karein SQL Injection se bachne ke liye
  const query = "DELETE FROM enquiries WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Delete failed", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    return res.status(200).json({ message: "Enquiry deleted successfully" });
  });
});
export default router;
