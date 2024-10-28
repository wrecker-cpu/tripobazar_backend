const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.DB_URL;
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`DB_CON Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
