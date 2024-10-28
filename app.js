const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Ensure to load environment variables

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
app.use("/api/users", userRoutes); // User-related routes under /api/users
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

// Call the database connection function
connectDB();

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server creation
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
