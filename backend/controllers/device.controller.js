const asyncHandler = require("express-async-handler");
const Device = require("../models/device.model.js");
const Organization = require("../models/organization.model.js");
const User = require("../models/user.model.js");

// @desc    Get devices
// @route   GET /api/devices
// @access  Private
const getDevices = asyncHandler(async (req, res) => {
  const devices = await Device.find({
    organization: req.organization.id,
  });

  res.status(200).json(devices);
});

// @desc    Set devices
// @route   POST /api/devices
// @access  Private
const setDevice = asyncHandler(async (req, res) => {
  const { serial, name, organization, remote } = req.body;
  if (!serial || !name || !organization || !remote) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  const device = await Device.create({
    serial: serial,
    name: name,
    organization: req.organization.id,
    remote: remote,
  });

  res.status(200).json(org);
});

// @desc    Update device
// @route   PUT /api/device/:id
// @access  Private
const updateDevice = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found.");
  }

  // Check for org
  if (!req.organization) {
    res.status(401);
    throw new Error("Organization not found.");
  }

  // Make sure the device's organization matches the current organization
  if (device.organization.toString() !== req.organization.id) {
    res.status(401);
    throw new Error("Organization not authorized to update this device.");
  }

  const updatedDevice = await Device.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedDevice);
});

// @desc    Delete device
// @route   DELETE /api/device/:id
// @access  Private
const deleteDevice = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found.");
  }

  // Check for org
  if (!req.organization) {
    res.status(401);
    throw new Error("Organization not found.");
  }

  // Make sure the device's organization matches the current organization
  if (device.organization.toString() !== req.organization.id) {
    res.status(401);
    throw new Error("Organization not authorized to update this device.");
  }

  await Device.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDevices,
  setDevice,
  updateDevice,
  deleteDevice,
};
