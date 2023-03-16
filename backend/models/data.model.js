const mongoose = require("mongoose");

// Define the data point schema
const DataPointSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  raw_activity: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  weather: {
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windspeed: { type: Number, required: true },
  },
  prediction_activity: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  last_prediction_deviation: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Datapoint", DataPointSchema);
