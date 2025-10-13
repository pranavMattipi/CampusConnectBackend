import express from "express";
import Event from "../models/event.model.js";

const router = express.Router();

// Create event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all events with search functionality
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let events;
    
    if (search) {
      const regex = new RegExp(search, "i");
      events = await Event.find({ 
        $or: [
          { title: regex },
          { description: regex },
          { location: regex },
          { city: regex },
          { college: regex }
        ]
      });
    } else {
      events = await Event.find();
    }
    
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const singleEvent = await Event.findById(req.params.id);
    if (!singleEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, data: singleEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
