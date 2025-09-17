import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";
import College from "../models/college.model.js";

const router = express.Router();

// ADD NEW STUDENT
router.post("/add", async (req, res) => {
  try {
    const { name, rollNumber, branch, year, email, password, collegeId } = req.body;

    // Check college exists
    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ error: "College not found" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      name,
      rollNumber,
      branch,
      year,
      email,
      password: hashedPassword,
      college: college._id
    });

    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("college");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
