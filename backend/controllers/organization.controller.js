const asyncHandler = require("express-async-handler");
const Organization = require("../models/organization.model.js");
const User = require("../models/user.model.js");

// @desc    Get orgs
// @route   GET /api/orgs
// @access  Private
// if owner then something
// if member1-5 then something else
const getOrgs = asyncHandler(async (req, res) => {
  const orgs = await Organization.find(/*{ owner: req.user.id } */);

  res.status(200).json(orgs);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setOrg = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const org = await Organization.create({
    name: req.body.text,
    owner: req.user.id,
  });

  res.status(200).json(org);
});

// @desc    Update Org
// @route   PUT /api/orgs/:id
// @access  Private
const updateOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.id);

  if (!org) {
    res.status(400);
    throw new Error("Organization not found");
  }

  // Check for user
  if (!req.owner) {
    res.status(401);
    throw new Error("Owner not found");
  }

  // Make sure the logged in user matches the Org user
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

// @desc    Delete Org
// @route   DELETE /api/orgs/:id
// @access  Private
const deleteOrg = asyncHandler(async (req, res) => {
  const org = await Organization.findById(req.params.id);

  if (!org) {
    res.status(400);
    throw new Error("Org not found");
  }

  // Check for user
  if (!req.owner) {
    res.status(401);
    throw new Error("Owner not found");
  }

  // Make sure the logged in user matches the Org user
  if (org.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
