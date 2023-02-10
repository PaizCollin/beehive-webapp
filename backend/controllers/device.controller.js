const asyncHandler = require("express-async-handler");
const Device = require("../models/device.model.js");
const User = require("../models/user.model.js");
const ObjectId = require("mongodb").ObjectId;

// @status  IN PROGRESS
// @desc    Get devices
// @route   GET /api/devices/:org_id
// @access  Private; all members of org
const getDevices = asyncHandler(async (req, res) => {
  // Check if user (from protect) is a member of the organizatio param

  const devices = await Device.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });

  console.log(req.user.id);

  res.status(200).json(orgs);
});

// @status  IN PROGRESS
// @desc    Set device
// @route   POST /api/devices/:org_id
// @access  Private; owners of org only
const setDevice = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400);
    throw new Error("Please include all required fields.");
  }

  // Check if org exists
  const orgExists = await Organization.findOne({ name });

  if (orgExists) {
    res.status(400);
    throw new Error("Organization already exists");
  }

  // Create organization
  const org = await Organization.create({
    name: name,
    location: location,
    members: {
      user: req.user.id,
      isOwner: true,
    },
  });

  res.status(200).json(org);
});

// @status  IN PROGRESS
// @desc    Update device
// @route   PUT /api/devices/:org_id/:device_id
// @access  Private; owners of org only
const updateDevice = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.org_id);

  if (!org) {
    res.status(400);
    throw new Error("Organization not found.");
  }

  // Check for user (logged in essentially, from protect)
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches a member of this org and isOwner
  var curUserID;
  var owner;
  org.members.forEach((member) => {
    if (member.user.toString() === req.user.id) {
      curUserID = member.user;
      owner = member.isOwner;
      return;
    }
  });

  // If not the owner or not the currently logged in user, unauthorized
  if (!owner || curUserID.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Update the organization accordingly
  const updatedOrg = await Organization.findByIdAndUpdate(
    req.params.org_id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedOrg);
});

// @status  IN PROGRESS
// @desc    Delete device
// @route   DELETE /api/devices/:org_id/:device_id
// @access  Private; owners of org only
const deleteDevice = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.org_id);

  if (!org) {
    res.status(400);
    throw new Error("Organization not found.");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches a member of this org and isOwner
  var curUserID;
  var owner;
  org.members.forEach((member) => {
    if (member.user.toString() === req.user.id) {
      curUserID = member.user;
      owner = member.isOwner;
      return;
    }
  });

  // If not the owner or not the currently logged in user, unauthorized
  if (!owner || curUserID.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  await Organization.remove();

  res.status(200).json({ id: req.params.org_id });
});

module.exports = {
  getDevices,
  setDevice,
  updateDevice,
  deleteDevice,
};
