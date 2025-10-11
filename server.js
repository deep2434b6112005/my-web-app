const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve static files (HTML, CSS, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Model
const User = mongoose.model("User", userSchema);

// ✅ Register Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("⚠️ Email already registered. Try logging in.");
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        // Redirect to login page after successful registration
        res.redirect("/login.html");
    } catch (err) {
        res.status(500).send("❌ Error registering user.");
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            // Redirect to walk.html on successful login
            res.redirect("/walk.html");
        } else {
            res.send("❌ Invalid credentials. Please try again.");
        }
    } catch (err) {
        res.status(500).send("❌ Error logging in.");
    }
});

// ✅ Start server
app.listen(3000, () => {
    console.log("🚀 Server started on http://localhost:3000");
});


// ✅ Get all registered users
app.get("/users", async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            };
        }

        const users = await User.find(query);
        res.json(users);
    } catch (err) {
        res.status(500).send("❌ Error fetching users.");
    }
});
