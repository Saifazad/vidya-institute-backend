import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs/dist/bcrypt.js";

import courseRoutes from "./routes/course.routes.js";
import admissionRoutes from "./routes/admission.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";

// async function hashPassword() {
//   const password = "admin@123";
//   const hash = await bcrypt.hash(password, 10);
//   console.log("Bcrypt Hash:");
//   console.log(hash);
//   //$2a$10$jSBPEzQYTT9.yNSOg537NOyfU7yHZCEDnAa0jgHKWSU6Jq3d5oT46
// }

// hashPassword();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/courses", courseRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.get("/", (req, res) => res.send("Vidya Group Backend Running 🚀"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
