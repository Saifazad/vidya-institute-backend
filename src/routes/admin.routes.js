import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (!results.length)
        return res.status(404).json({ message: "Admin not found" });

      const valid = bcrypt.compareSync(password, results[0].password);
      if (!valid) return res.status(401).json({ message: "Wrong password" });

      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ token });
    }
  );
});

export default router;
