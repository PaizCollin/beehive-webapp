const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    time: Date,
    intake: Number,
    outtake: Number,
    metadata: {
      sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
    },
  },
  {
    timeseries: {
      timeField: "time",
      granularity: "minutes",
    },
  }
);

module.exports = mongoose.model("Data", dataSchema);
