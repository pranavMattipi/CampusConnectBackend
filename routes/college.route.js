// routes/college.route.js
import express from "express";
import College from "../models/college.model.js";

const router = express.Router();

// ➕ Add new college
router.post("/add", async (req, res) => {
  try {
    const { name, domain, acquired } = req.body;
    const newCollege = new College({ name, domain, acquired });
    await newCollege.save();
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
