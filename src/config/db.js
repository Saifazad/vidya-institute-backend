import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 17821, // Aiven ka port zaroori hai
  ssl: {
    rejectUnauthorized: false, // Aiven ke liye ye line sabse zaroori hai!
  },
});
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

export default db;
