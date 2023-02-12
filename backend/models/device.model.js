const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    time: Date,
    intake: Number,
    outtake: Number,
  },
  {
    timeseries: {
      timeField: "time",
      granularity: "minutes",
    },
  }
);

const deviceSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: [true, "Please add a serial number"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add an orgnization"],
      ref: "Organization",
    },
    remote: {
      type: String,
      required: [true, "Please add a remote.it URL"],
      unique: true,
    },
    data: {
      type: dataSchema,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", deviceSchema);
