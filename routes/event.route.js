import express from "express";
import { event } from "../models/event.model.js";

const router = express.Router();

// Create event
router.post("/", async (req, res) => {
  try {
    const newEvent = new event(req.body);
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await event.find();
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const singleEvent = await event.findById(req.params.id);
    if (!singleEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, data: singleEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
