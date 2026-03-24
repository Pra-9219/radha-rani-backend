const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ✅ Routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ IMPORTANT (Render ke liye)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});