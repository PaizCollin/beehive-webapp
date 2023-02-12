const asyncHandler = require("express-async-handler");
const Organization = require("../models/organization.model.js");
const Device = require("../models/device.model.js");

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
// @desc    Get orgs
// @route   GET /api/organizations
// @access  Private; all users
const getOrgs = asyncHandler(async (req, res) => {
  //Find orgs where current user (from protect) is a member
  const orgs = await Organization.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });

  res.status(200).json(orgs);
});

// @status  WORKING
// @desc    Set org
// @route   POST /api/organizations
// @access  Private; all users
const setOrg = asyncHandler(async (req, res) => {
  // Get info from body
  const { name, location } = req.body;

  // If missing any req   fields, error
  if (!name || !location) {
    res.status(400);
    throw new Error("Please include all required fields.");
  }

  // Check if org exists
  const orgExists = await Organization.findOne({ name });

  // If orgExists, error
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

// @status  WORKING
// @desc    Update org
// @route   PUT /api/organizations/:org_id
// @access  Private; owners of org only
const updateOrg = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
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

// @status  WORKING
// @desc    Delete org
// @route   DELETE /api/organizations/:org_id
// @access  Private; owners of org only
const deleteOrg = asyncHandler(async (req, res) => {
  const { user, isOwner, org } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  // Get associated devices
  // Delete associated devices
  await Device.deleteMany({
    organization: req.params.org_id,
  });

  // Delete organization
  await org.remove();

  res.status(200).json({ id: req.params.org_id });
});

// @status  WORKING
// @desc    Update members to org
// @route   PUT /api/organizations/:org_id&:user_id
// @access  Private; owners of org only
const updateMembers = asyncHandler(async (req, res) => {
  const { user, isOwner, org } = await checkUserToOrg(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. Must be an owner of the organization to update the organization."
    );
  }

  var setOwner = false;
  if (req.params.isOwner !== 0) {
    setOwner = true;
  }

  var found = false;
  org.members.forEach((member) => {
    if (member.user.toString() === req.params.user_id) {
      member.isOwner = setOwner;
      found = true;
      return;
    }
  });

  if (!found) {
    // Push the new member :user_id to the org :org_id
    org.members.push({
      user: req.params.user_id,
      isOwner: setOwner,
    });
  }
  res.status(200).json(org.members);
});

module.exports = {
  getOrgs,
  setOrg,
  updateOrg,
  deleteOrg,
  updateMembers,
};
