const asyncHandler = require("express-async-handler");
const Apiary = require("../models/apiary.model.js");
const Device = require("../models/device.model.js");

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
// @desc    Get apiaries
// @route   GET /api/apiaries
// @access  Private; all users
const getApiaries = asyncHandler(async (req, res) => {
  //Find apiaries where current user (from protect) is a member
  const apiaries = await Apiary.find({
    members: {
      $elemMatch: {
        user: req.user.id,
      },
    },
  });

  res.status(200).json(apiaries);
});

// @status  WORKING
// @desc    Set apiary
// @route   POST /api/apiaries
// @access  Private; all users
const setApiary = asyncHandler(async (req, res) => {
  // Get info from body
  const { name, location } = req.body;

  // If missing any req   fields, error
  if (!name || !location) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  // Check if apiary exists
  const apiaryExists = await Apiary.findOne({ name });

  // If apiaryExists, error
  if (apiaryExists) {
    res.status(400);
    throw new Error("Apiary already exists");
  }

  // Create apiary
  const apiary = await Apiary.create({
    name: name,
    location: location,
    members: {
      user: req.user.id,
      isOwner: true,
    },
  });

  res.status(200).json(apiary);
});

// @status  WORKING
// @desc    Update apiary
// @route   PUT /api/apiaries/:apiary_id
// @access  Private; owners of apiary only
const updateApiary = asyncHandler(async (req, res) => {
  const { user, isOwner } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  // Update the apiary accordingly
  const updatedApiary = await Apiary.findByIdAndUpdate(
    req.params.apiary_id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Delete apiary
// @route   DELETE /api/apiaries/:apiary_id
// @access  Private; owners of apiary only
const deleteApiary = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  // Get associated devices
  // Delete associated devices
  await Device.deleteMany({
    apiary: req.params.apiary_id,
  });

  // Delete apiary
  await apiary.remove();

  res.status(200).json({ id: req.params.apiary_id });
});

// @status  WORKING
// @desc    Update members to apiary
// @route   PUT /api/apiaries/:apiary_id&:user_id
// @access  Private; owners of apiary only
const updateMembers = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  var setOwner = false;
  if (req.params.isOwner !== 0) {
    setOwner = true;
  }

  var found = false;
  apiary.members.forEach((member) => {
    if (member.user.toString() === req.params.user_id) {
      member.isOwner = setOwner;
      found = true;
      return;
    }
  });

  if (!found) {
    // Push the new member :user_id to the apiary :apiary_id
    apiary.members.push({
      user: req.params.user_id,
      isOwner: setOwner,
    });
  }
  res.status(200).json(apiary.members);
});

module.exports = {
  getApiaries,
  setApiary,
  updateApiary,
  deleteApiary,
  updateMembers,
};
