const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 4000;
//Require Routes

const userRoutes = require("./routes/UserRoutes");
const googleRoutes = require("./routes/GoogleRoutes");



app.use(userRoutes);
app.use(googleRoutes);

//DATABASE CONNECTION
const db = mongoose.connect(process.env.DB_URL, {});

db.then(() => {
  console.log("HELL Yeah");
}).catch((err) => {
  console.log("Failed to connect to DB", err);
});

//server creation
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
