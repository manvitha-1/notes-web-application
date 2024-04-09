const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://manvitha_m:umes%401234@cluster0.bvfldq6.mongodb.net/notesapp-user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB database.");
});
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email, password });
    if (existingUser) {
      res.status(200).json({ valid: true, email: existingUser.email });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, send an error response
      return res.status(400).json({ message: "User already exists" });
    }
    // If user doesn't exist, create a new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  userEmail: String // Add userEmail field
});

const Note = mongoose.model("Note", noteSchema);


app.get("/api/notes", async (req, res) => {
  try {
    const { userEmail } = req.query; // Get the logged-in user's email from query parameters
    const notes = await Note.find({ userEmail }); // Filter notes by userEmail
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, description, userEmail } = req.body;
    console.log("Received data:", { title, description, userEmail });
    const newNote = new Note({
      title,
      description,
      userEmail // Include the userEmail
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", saved: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", saved: false });
  }
});


app.put("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, userEmail } = req.body; // Retrieve userEmail from request body
    await Note.findByIdAndUpdate(id, { title, description, userEmail: userEmail });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Endpoint to delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/delete", async (req, res) => {
  try {
    // Delete all users from the database
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

