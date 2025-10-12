const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema: Users
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },
});
userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);

// Schema: Booking
const bookingSchema = new mongoose.Schema({
  userEmail: String,
  buddyEmail: String,
  slot: String,
  date: String,
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
  } catch {
    res.status(500).send("❌ Error registering user.");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      // redirect to dashboard (or walk.html)
      res.redirect("/walk.html");
    } else {
      res.send("❌ Invalid credentials.");
    }
  } catch {
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
  } catch {
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
  } catch {
    res.status(500).send("❌ Error fetching nearby users.");
  }
});

// Book a slot
app.post("/book", async (req, res) => {
  try {
    const { userEmail, buddyEmail, slot, date } = req.body;
    await new Booking({ userEmail, buddyEmail, slot, date }).save();
    res.json({ message: "✅ Booking confirmed!" });
  } catch {
    res.status(500).send("❌ Error creating booking.");
  }
});

// ✅ Get all registered users (for Friends page)
app.get("/users", async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserEmail = req.query.currentUserEmail || "";

    // Find users except the current logged-in user
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

// =========================================================

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
