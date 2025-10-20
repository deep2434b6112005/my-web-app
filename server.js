require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// ===================== MONGODB CONNECTION =====================
const uri = process.env.MONGODB_URI;
console.log("Mongo URI:", uri);

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===================== USER SCHEMA =====================
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
      default: [0, 0],
    },
  },
});

userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);

// ===================== BOOKING SCHEMA =====================
const bookingSchema = new mongoose.Schema({
  userEmail: String,
  buddyEmail: String,
  slot: String,
  date: String,
  status: {
    type: String,
    default: "pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

// ======================== ROUTES ======================== //

// ---------- Register User ----------
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

// ---------- Login and Update Location ----------
app.post("/login", async (req, res) => {
  try {
    const { email, password, latitude, longitude } = req.body;

    // 1️⃣ Verify user credentials
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.json({ success: false, message: "❌ Invalid credentials." });
    }

    // 2️⃣ Update location if available
    if (latitude && longitude) {
      await User.updateOne(
        { email },
        { location: { type: "Point", coordinates: [longitude, latitude] } }
      );
      console.log(`📍 Location updated for ${email}`);
    }

    // 3️⃣ Respond with redirect URL
    res.json({ success: true, redirect: `/walk.html?user=${email}` });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error logging in.");
  }
});

// ---------- Find Nearby Users ----------
app.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
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

// ---------- Send Invite ----------
app.post("/invite", async (req, res) => {
  try {
    const { userEmail, buddyEmail, slot, date } = req.body;

    const existing = await Booking.findOne({ userEmail, buddyEmail, date, slot });
    if (existing) return res.json({ message: "⚠️ Invite already sent." });

    await new Booking({ userEmail, buddyEmail, slot, date }).save();
    res.json({ message: "📩 Invite sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error sending invite.");
  }
});

// ---------- Get Invites ----------
app.get("/invites", async (req, res) => {
  try {
    const { email } = req.query;

    const invites = await Booking.find({
      $or: [{ buddyEmail: email }, { userEmail: email }],
    });

    res.json(invites);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error fetching invites.");
  }
});

// ---------- Accept/Reject Invite ----------
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

// ---------- Get All Users (Friends Page) ----------
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
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// ---------- Catch-All (Serve Frontend) ----------
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
