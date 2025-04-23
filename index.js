const express = require("express");
const mongoose = require("mongoose");
const ngrok = require("ngrok");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
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

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // try {
  //   const url = await ngrok.connect(PORT); // this starts ngrok tunnel
  //   console.log(`ngrok tunnel: ${url}`);
  // } catch (err) {
  //   console.error("Failed to start ngrok tunnel", err);
  // }
});
