const mongoose = require("mongoose");

const geoSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number], //the type is an array of numbers
    index: "2dsphere",
  },
  formattedAddress: {
    type: String,
  },
  placeID: {
    type: String,
  },
});

const memberSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add a creator"],
    ref: "User",
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN", "CREATOR"],
  },
});

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

const dataPointSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  serialNumber: { type: Number, required: true },
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

const deviceSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: [true, "Please add a serial number"],
      unique: true,
      partialFilterExpression: { serial: { $type: "string" } },
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    remote: {
      type: String,
      required: [true, "Please add a remote.it URL"],
      unique: true,
      partialFilterExpression: { remote: { $type: "string" } },
    },
    data: {
      type: dataSchema,
    },
    dataPoints: {
      type: dataPointSchema,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

const apiarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    location: {
      type: geoSchema,
      required: [true, "Please add a location"],
    },
    members: [
      {
        type: memberSchema,
        required: [true, "Please add a member"],
        validate: [arrayLimit, "Members exceeds the limit of 10"],
      },
    ],
    devices: [
      {
        type: deviceSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Apiary", apiarySchema);
