import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

// Import models
import Gig from './models/Gig.js';
import User from './models/User.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// User Registration
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// User Login
app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // In a real app, you'd return a JWT here
        res.json({ msg: "Logged in successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// Get all gigs
app.get("/api/gigs", async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.json(gigs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Post a new gig
app.post("/api/gigs", async (req, res) => {
  const { title, description, location, applyLink } = req.body;
  try {
    const newGig = new Gig({
      title,
      description,
      location,
      applyLink,
    });
    const gig = await newGig.save();
    res.json(gig);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Basic route
app.get("/", (req, res) => {
  res.send("Gigzy backend running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
