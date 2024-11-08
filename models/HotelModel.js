const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelName: {
    type: String,
    required: true,
  },
  PhotoUrl: {
    type: [String],
  },
  Rating:{
    type:Number,
  },
  HotelRate:{
    type:Number,
  }
});

module.exports = mongoose.model("Hotel", hotelSchema);
