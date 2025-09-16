import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import searchRoutes from "./routes/search.route.js";
import eventRoutes from "./routes/event.route.js";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";
import collegeRoutes from "./routes/college.route.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/search", searchRoutes);

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // All non-API routes → React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
} else {
  // Dev mode root
  app.get("/", (req, res) => {
    res.send("College Events & Student API is running...");
  });
}

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//STUDENT FORMAT
//POST http://localhost:8000/api/students/add
// {
//   "name": "ParamM",
//   "rollNumber": "CSE2025026",
//   "branch": "Computer Science",
//   "year": 2,
//   "email": "se24ucse144@iitd.ac.in",
//   "password": "helloworld123",
//   "collegeId": "68a333cfa5fc739f0ea5ccd5"
// }