import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";
import College from "../models/college.model.js";

const router = express.Router();

/**
 * @route   POST /api/students/add
 * @desc    Add new student
 */
router.post("/add", async (req, res) => {
  try {
    const { name, rollNumber, branch, year, email, password, collegeId } = req.body;

    // Check if college exists
    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ error: "College not found" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new student
    const newStudent = new Student({
      name,
      rollNumber,
      branch,
      year,
      email,
      password: hashedPassword,
      college: college._id,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      student: {
        _id: newStudent._id,
        studentId: newStudent.studentId,
        name: newStudent.name,
        rollNumber: newStudent.rollNumber,
        branch: newStudent.branch,
        year: newStudent.year,
        email: newStudent.email,
        college: college.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/students
 * @desc    Get all students
 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("college");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/students/:id
 * @desc    Get student by MongoDB _id
 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("college");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/students/studentId/:studentId
 * @desc    Get student by custom studentId
 */
router.get("/studentId/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId }).populate("college");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
