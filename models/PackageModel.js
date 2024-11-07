const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  whatsIncluded: {
    type: [String], // Array of strings for items like 'Food', 'Hotel', 'Car', etc.
    enum: ['Food', 'Hotel', 'Car', 'Explore', 'Travel', 'Visa'], // Restrict values to these options
  },
  coupon: {
    type: [String], // Array of coupon codes if any
  },
  MainPhotos: {
    type: [String], // Array of photo URLs
  },
  dayDescription: [
    {
      dayTitle: {
        type: String,
        required: true,
      },
      photos: {
        type: [String], // Array of photo URLs for each day
      },
      dayDetails: {
        type: String,
        required: true, // Detailed description for each day
      },
    },
  ],
  specialInstruction: {
    type: String,
  },
  conditionOfTravel: {
    type: String,
  },
  thingsToMaintain: {
    type: String,
  },
  hotel: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hotel', // Assuming you have a separate 'Hotel' model
    },
  ],
  policies: {
    childPolicies: {
      type: String, // You can store the text or further structure it as needed
    },
    cancelPolicy: {
      type: String,
    },
  },
  termsAndConditions: [
    {
      inclusions: {
        type: String,
      },
      exclusions: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Package', packageSchema);
