import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email and populate college
    const student = await Student.findOne({ email }).populate("college");
    if (!student) return res.status(404).json({ error: "Student not found" });

    // ✅ Check student is linked to a college
    if (!student.college) {
      return res.status(403).json({ error: "You are not registered in any college" });
    }

    // ✅ Instead of forcing frontend to send college name/domain,
    // just trust the student's linked college
    // (optional: normalize domain check)
    const emailDomain = email.split("@")[1].trim().toLowerCase();
    if (emailDomain !== student.college.domain.toLowerCase()) {
      return res.status(403).json({ error: "Invalid email domain for this college" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: student._id, college: student.college._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Respond with token + student info
    res.json({
      token,
      studentId: student._id,
      name: student.name,
      college: {
        id: student.college._id,
        name: student.college.name,
        domain: student.college.domain,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
