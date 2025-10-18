require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

console.log("Mongo URI:", process.env.MONGODB_URI);


// MongoDB connection string
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

//
// ---------- USER SCHEMA ----------
//
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // placeholder until updated
    },
  },
});

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);

//
// ---------- BOOKING SCHEMA ----------
//
const bookingSchema = new mongoose.Schema({
  userEmail: String,
  buddyEmail: String,
  slot: String,
  date: String,
  status: { type: String, default: "pending" }, // pending | accepted | rejected
});
const Booking = mongoose.model("Booking", bookingSchema);

//
// ======================== ROUTES ========================
//

// Register user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("⚠️ Email already registered.");

    await new User({ name, email, password }).save();
    res.redirect("/login.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error registering user.");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, redirect: `/walk.html?user=${email}` });
    } else {
      res.json({ success: false, message: "❌ Invalid credentials." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error logging in.");
  }
});

// Update user location
app.post("/update-location", async (req, res) => {
  try {
    const { email, latitude, longitude } = req.body;
    await User.updateOne(
      { email },
      { location: { type: "Point", coordinates: [longitude, latitude] } }
    );
    res.json({ message: "📍 Location updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error updating location.");
  }
});

// Find nearby users
app.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const users = await User.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 2000,
        },
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error fetching nearby users.");
  }
});

//
// ---------- INVITE SYSTEM ----------
//

// Send invite (pending by default)
app.post("/invite", async (req, res) => {
  try {
    const { userEmail, buddyEmail, slot, date } = req.body;

    // Prevent duplicates
    const existing = await Booking.findOne({ userEmail, buddyEmail, date, slot });
    if (existing) return res.json({ message: "⚠️ Invite already sent." });

    await new Booking({ userEmail, buddyEmail, slot, date }).save();
    res.json({ message: "📩 Invite sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error sending invite.");
  }
});

// Get invites (for a buddy)
app.get("/invites", async (req, res) => {
  try {
    const { email } = req.query;
    const invites = await Booking.find({
      $or: [
        { buddyEmail: email }, // received
        { userEmail: email },  // sent
      ],
    });
    res.json(invites);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error fetching invites.");
  }
});

// Accept or reject invite
app.post("/respond-invite", async (req, res) => {
  try {
    const { id, status } = req.body;
    await Booking.findByIdAndUpdate(id, { status });
    res.json({ message: `✅ Invite ${status}!` });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error updating invite.");
  }
});

//
// ---------- FRIENDS / USERS ----------
//

// Get all registered users (for Friends page)
app.get("/users", async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserEmail = req.query.currentUserEmail || "";

    const users = await User.find({
      email: { $ne: currentUserEmail },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("name email -_id");

    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

//
// =========================================================
//

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
