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
      location: String,
    },
  },
  {
    timeseries: {
      timeField: "time",
      metaField: "metadata",
      granularity: "hours",
    },
  }
);

module.exports = mongoose.model("Data", dataSchema);
