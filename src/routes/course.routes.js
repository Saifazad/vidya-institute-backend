import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Get all courses (Public) */
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/*  Get single course (Public) */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
});

/*  Add course (Admin only) */
router.post("/", verifyToken, (req, res) => {
  const { title, description, duration, fee } = req.body;

  db.query(
    "INSERT INTO courses SET ?",
    { title, description, duration, fee },
    () => res.json({ message: "Course Added Successfully" })
  );
});

/* Update course (Admin only) */
router.put("/:id", verifyToken, (req, res) => {
  const { title, description, duration, fee } = req.body;

  const sql =
    "UPDATE courses SET title=?, description=?, duration=?, fee =? WHERE id=?";

  db.query(sql, [title, description, duration, fee, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Course updated successfully" });
  });
});

/* Delete course (Admin only) */
router.delete("/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM courses WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Course deleted successfully" });
  });
});

export default router;
