// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/chatApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// Routes
// Get all comments
app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// Post a new comment
app.post("/comments", async (req, res) => {
  const { username, text } = req.body;
  const comment = new Comment({ username, text });
  await comment.save();
  res.json(comment);
});

// Delete a comment by admin
app.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { adminToken } = req.headers;
  if (adminToken === "yourAdminSecret") {
    await Comment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted." });
  } else {
    res.status(403).json({ message: "Unauthorized action" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
