const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    coord: [Number],
    street: String,
    zipcode: Number,
  },
  borough: String,
  cuisine: String,
  grades: [{ date: { $date: Number }, grade: String, score: Number }],
  name: String,
  restaurant_id: Number,
});

module.exports = mongoose.model("restaurant", restaurantSchema);
