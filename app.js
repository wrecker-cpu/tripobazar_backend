const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Ensure environment variables are loaded

const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable for port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Require Routes
const userRoutes = require("./routes/UserRoutes");
const googleRoutes = require("./routes/GoogleRoutes");

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define API Endpoints with prefixes
app.use("/api/users", userRoutes);
app.use("/api/google", googleRoutes);

// DATABASE CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1); // Exit process if connection fails
  }
};

// Call the function to initialize the connection
connectDB();

// Server creation
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
