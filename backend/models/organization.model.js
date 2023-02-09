const mongoose = require("mongoose");

const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number], //the type is an array of numbers
    index: "2dsphere",
  },
});

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    location: {
      type: GeoSchema,
      required: [true, "Please add a location"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add an owner"],
      ref: "User",
    },
    member1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
