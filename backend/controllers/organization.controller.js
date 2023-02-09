const asyncHandler = require("express-async-handler");
const Organization = require("../models/organization.model.js");
const User = require("../models/user.model.js");

// @status  WORKING
// @desc    Get orgs
// @route   GET /api/orgs
// @access  Private; all users
const getOrgs = asyncHandler(async (req, res) => {
  const orgs = await Organization.find({ members: req.user.id });

  res.status(200).json(orgs);
});

// @status  WORKING
// @desc    Set orgs
// @route   POST /api/orgs
// @access  Private; all users
const setOrg = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    res.status(400);
    throw new Error("Please include all required fields.");
  }

  let org = await Organization.create({
    name: name,
    location: location,
  });

  org.members.push({
    user: req.user.id,
    isOwner: true,
  });

  res.status(200).json(org);
});

// @status  WORKING
// @desc    Update Org
// @route   PUT /api/orgs/:id
// @access  Private; owners only
const updateOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.org_id);

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
    req.params.org_id,
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
// @access  Private; owners only
const deleteOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.org_id);

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
  if (org.owner.toString() !== req.user.org_id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await Organization.remove();

  res.status(200).json({ id: req.params.org_id });
});

module.exports = {
  getOrgs,
  setOrg,
  updateOrg,
  deleteOrg,
};
