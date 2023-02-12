const asyncHandler = require("express-async-handler");
const Device = require("../models/device.model.js");
const Organization = require("../models/organization.model.js");

// @status  WORKING
// @desc    Check that user is part of organization
// @return  Returns a user_id and isOwner
async function checkUserToOrg(req, res) {
  // Find org from param :org_id
  const org = await Organization.findById(req.params.org_id);

  // If org not found, error
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
  var user;
  var isOwner;
  org.members.forEach((member) => {
    if (member.user.toString() === req.user.id) {
      user = member.user;
      isOwner = member.isOwner;
      return;
    }
  });

  return { user, isOwner, org };
}

// @status  WORKING
// @desc    Get devices
// @route   GET /api/devices/:org_id
// @access  Private; all members of org
const getDevices = asyncHandler(async (req, res) => {
  const { user } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Find devices in the organization :org_id
  const devices = await Device.find({
    organization: req.params.org_id,
  });

  res.status(200).json(devices);
});

// @status  WORKING
// @desc    Get data
// @route   GET /api/devices/:org_id&:device_id
// @access  Private; all members of org
const getData = asyncHandler(async (req, res) => {
  const { user } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Find device in the organization :org_id by device :device_id
  const device = await Device.find({
    _id: req.params.device_id,
    organization: req.params.org_id,
  });

  res.status(200).json(device.data);
});

// @status  WORKING
// @desc    Set device
// @route   POST /api/devices/:org_id
// @access  Private; owners of org only
const setDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Get info from body
  const { serial, name, remote } = req.body;

  // If missing any req fields, error
  if (!serial || !name || !remote) {
    res.status(400);
    throw new Error("Please include all required fields.");
  }

  // Check if device exists
  const deviceExists = await Device.findOne({ serial });

  // If device exists, error
  if (deviceExists) {
    res.status(400);
    throw new Error("Device already exists");
  }

  // Create Device
  const device = await Device.create({
    serial: serial,
    name: name,
    organization: req.params.org_id,
    remote: remote,
    data: null,
  });

  res.status(200).json(device);
});

// @status  WORKING
// @desc    Update device
// @route   PUT /api/devices/:org_id&:device_id
// @access  Private; owners of org only
const updateDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Update the organization accordingly
  const updateDevice = await Device.findByIdAndUpdate(
    req.params.device_id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateDevice);
});

// @status  WORKING
// @desc    Delete device
// @route   DELETE /api/devices/:org_id&:device_id
// @access  Private; owners of org only
const deleteDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  const device = await Device.findById(req.params.device_id);

  await device.remove();

  res.status(200).json({ id: req.params.device_id });
});

module.exports = {
  getDevices,
  getData,
  setDevice,
  updateDevice,
  deleteDevice,
};
