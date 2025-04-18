const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// POST create new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.send("User deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
