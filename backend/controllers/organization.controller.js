const asyncHandler = require("express-async-handler");
const Organization = require("../models/organization.model.js");
const User = require("../models/user.model.js");

// @status  WORKING
// @desc    Get orgs
// @route   GET /api/orgs
// @access  Private
const getOrgs = asyncHandler(async (req, res) => {
  const orgs = await Organization.find({ owner: req.user.id });

  res.status(200).json(orgs);
});

// @status  WORKING
// @desc    Set orgs
// @route   POST /api/orgs
// @access  Private
const setOrg = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400);
    throw new Error("Please include all required fields.");
  }

  const org = await Organization.create({
    name: name,
    location: location,
    owner: req.user.id,
  });

  res.status(200).json(org);
});

// @status  WORKING
// @desc    Update Org
// @route   PUT /api/orgs/:id
// @access  Private
const updateOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.id);

  if (!org) {
    res.status(400);
    throw new Error("Organization not found.");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Owner not found.");
  }

  // Make sure the logged in user matches the Org owner
  if (org.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be the owner to access this content."
    );
  }

  const updatedOrg = await Organization.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedOrg);
});

// @status  NOT WORKING
// @desc    Delete Org
// @route   DELETE /api/orgs/:id
// @access  Private
const deleteOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.id);

  if (!org) {
    res.status(400);
    throw new Error("Org not found.");
  }

  // Check for user
  if (!req.owner) {
    res.status(401);
    throw new Error("Owner not found.");
  }

  // Make sure the logged in user matches the Org user
  if (org.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await Organization.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrgs,
  setOrg,
  updateOrg,
  deleteOrg,
};
