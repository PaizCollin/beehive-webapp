const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add an owner"],
      ref: "User",
    },
    member1: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a member"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
