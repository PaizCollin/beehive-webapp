const asyncHandler = require("express-async-handler");
const Device = require("../models/device.model.js");
const Apiary = require("../models/apiary.model.js");

// @status  WORKING
// @desc    Check that user is part of apiary
// @return  Returns a user_id and isOwner
async function checkUserToApiary(req, res) {
  // Find apiary from param :apiary_id
  const apiary = await Apiary.findById(req.params.apiary_id);

  // If apiary not found, error
  if (!apiary) {
    res.status(400);
    throw new Error("Apiary not found");
  }

  // Check for user (logged in essentially, from protect)
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches a member of this apiary and isOwner
  var user;
  var isOwner;
  apiary.members.forEach((member) => {
    if (member.user.toString() === req.user.id) {
      user = member.user;
      isOwner = member.isOwner;
      return;
    }
  });

  return { user, isOwner, apiary };
}

// @status  WORKING
// @desc    Get devices
// @route   GET /api/devices/:apiary_id
// @access  Private; all members of apiary
const getDevices = asyncHandler(async (req, res) => {
  const { user } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be a member of the apiary to view its devices"
    );
  }

  // Find devices in the apiary :apiary_id
  const devices = await Device.find({
    apiary: req.params.apiary_id,
  });

  res.status(200).json(devices);
});

// @status  WORKING
// @desc    Get data
// @route   GET /api/devices/:apiary_id&:device_id
// @access  Private; all members of apiary
const getData = asyncHandler(async (req, res) => {
  const { user } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be a member of the apiary to view its data"
    );
  }

  // Find device in the apiary :apiary_id by device :device_id
  const device = await Device.find({
    _id: req.params.device_id,
    apiary: req.params.apiary_id,
  });

  res.status(200).json(device.data);
});

// @status  WORKING
// @desc    Set device
// @route   POST /api/devices/:apiary_id
// @access  Private; owners of apiary only
const setDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to set its devices"
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
    apiary: req.params.apiary_id,
    remote: remote,
    data: null,
  });

  res.status(200).json(device);
});

// @status  WORKING
// @desc    Update device
// @route   PUT /api/devices/:apiary_id&:device_id
// @access  Private; owners of apiary only
const updateDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update its devices"
    );
  }

  // Update the apiary accordingly
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
// @route   DELETE /api/devices/:apiary_id&:device_id
// @access  Private; owners of apiary only
const deleteDevice = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to delete its devices"
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
