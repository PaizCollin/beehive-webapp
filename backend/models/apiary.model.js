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
