const mongoose = require("mongoose");

// Define the data point schema
const dataPointSchema = new mongoose.Schema({
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

const dataSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: [true, "Please add a serial number"],
    unique: true,
    // partialFilterExpression: { serial: { $type: "string" } },
    sparse: true,
    immutable: true,
  },
  datapoints: [
    {
      type: dataPointSchema,
    },
  ],
});

module.exports = mongoose.model("Data", dataSchema);
