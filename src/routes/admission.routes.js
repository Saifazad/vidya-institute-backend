import express from "express";
import db from "../config/db.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, phone, email, course } = req.body;
    const photo = req.files.photo?.[0]?.filename;
    const document = req.files.document?.[0]?.filename;

    db.query(
      "INSERT INTO admissions SET ?",
      { name, phone, email, course, photo, document },
      () => res.json({ message: "Admission Submitted Successfully" })
    );
  }
);

router.get("/", (req, res) => {
  db.query("SELECT * FROM admissions ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results); // Frontend ko saara data bhej raha hai
  });
});

export default router;
