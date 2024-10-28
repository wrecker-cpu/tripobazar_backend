const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Require Routes

const userRoutes = require("./routes/UserRoutes");
const googleRoutes = require("./routes/GoogleRoutes");

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(userRoutes);
app.use(googleRoutes);

//DATABASE CONNECTION
module.exports = app;
