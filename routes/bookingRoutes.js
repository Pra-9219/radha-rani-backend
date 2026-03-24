const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ CREATE booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    booking.status =
      booking.status === "pending" ? "confirmed" : "pending";

    await booking.save();
    res.json(booking);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;