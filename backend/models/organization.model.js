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
});

const memberSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add an owner"],
    ref: "User",
  },
  isOwner: {
    type: Boolean,
    required: [false, "Please specify if owner"],
  },
});

const organizationSchema = new mongoose.Schema(
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
