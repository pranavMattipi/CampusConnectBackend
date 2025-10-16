import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";

// Routes
import searchRoutes from "./routes/search.route.js";
import eventRoutes from "./routes/event.route.js";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";
import collegeRoutes from "./routes/college.route.js";
import uploadRoute from "./routes/upload.route.js"; // ✅ ADD THIS LINE

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Upload route
app.use("/api/upload", uploadRoute);

// ✅ Serve uploaded files publicly
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

// API Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/search", searchRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ College Events & Student API is running...");
});

// --- Render & Local deployment ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
