import express from "express";
import { event } from "../models/event.model.js";
import College from "../models/college.model.js";
import Student from "../models/student.model.js";

const router = express.Router();

// 🔍 Global Search API
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.json({ events: [], colleges: [], students: [] });
    }

    const regex = new RegExp(q, "i"); // case-insensitive match

    const events = await event.find({ title: regex }).limit(5);
    const colleges = await College.find({ name: regex }).limit(5);
    const students = await Student.find({ name: regex }).limit(5);

    res.json({ events, colleges, students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
