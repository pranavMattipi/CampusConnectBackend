import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

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

// Root route
app.get("/", (req, res) => {
  res.send("✅ College Events & Student API is running...");
});

// --- Vercel (serverless) export and local development server ---
// On Vercel, the framework runtime will import this file and use the exported app.
// We only call listen() when running locally (e.g., Node/Render/Dev).
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

export default app;