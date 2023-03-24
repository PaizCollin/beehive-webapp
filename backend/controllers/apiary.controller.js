const asyncHandler = require("express-async-handler");
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
  }).populate("members.user");

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
    devices: [],
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

  // Update the apiary accordingly (only update name, location)
  // Cannot update arrays directly (prevent overwriting array)
  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $set: {
        name: req.body.name,
        //location: req.body.location,
      },
    },
    {
      new: true,
    }
  ).populate("members.user");

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

  // Delete apiary
  await apiary.remove();

  res.status(200).json({ id: req.params.apiary_id });
});

// @status  WORKING
// @desc    Set device
// @route   PUT /api/apiaries/device/:apiary_id
// @access  Private; owners of apiary only
const setDevice = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);
  const { serial, name, remote } = req.body;

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  // Check if device exists
  const deviceExists = await Apiary.findOne({
    devices: {
      $elemMatch: {
        serial: req.body.serial,
      },
    },
  });

  // If deviceExists, error
  if (deviceExists) {
    res.status(401);
    throw new Error("Device already exists");
  }

  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $push: {
        devices: {
          serial: serial,
          name: name,
          remote: remote,
          data: {},
        },
      },
    }
  );

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Update device
// @route   PUT /api/apiaries/device/:apiary_id&:device_id
// @access  Private; owners of apiary only
const updateDevice = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);
  const { serial, name, remote } = req.body;

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  const updatedApiary = await Apiary.findOneAndUpdate(
    { _id: req.params.apiary_id, "devices._id": req.params.device_id },
    {
      $set: {
        "devices.$.serial": serial,
        "devices.$.name": name,
        "devices.$.remote": remote,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedApiary) {
    res.status(401);
    throw new Error("Device was not found");
  }

  res.status(200).json(updatedApiary.devices);
});

// @status  WORKING
// @desc    Delete device
// @route   DELETE /api/apiaries/device/:apiary_id&:device_id
// @access  Private; owners of apiary only
const deleteDevice = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);
  const { serial, name, remote } = req.body;

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $pull: {
        devices: {
          _id: req.params.device_id,
        },
      },
    }
  );

  if (!updatedApiary) {
    res.status(401);
    throw new Error("Device was not found");
  }

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Update members to apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id&setOwner
// @access  Private; owners of apiary only
const setMember = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  var found = false;
  apiary.members.forEach((member) => {
    if (member.user.toString() === req.body.user) {
      found = true;
      res.status(401);
      throw new Error("User is already a member of this apiary");
    }
  });

  var updatedApiary;

  if (!found) {
    // Push the new member :user_id to the apiary :apiary_id
    updatedApiary = await Apiary.findByIdAndUpdate(
      { _id: req.params.apiary_id },
      {
        $push: {
          members: {
            user: req.body.user,
            isOwner: req.body.isOwner,
          },
        },
      }
    );
  }

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Update members to apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id&setOwner
// @access  Private; owners of apiary only
const updateMember = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);
  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  var found = false;
  apiary.members.forEach((member) => {
    if (member.user.toString() === req.params.user_id) {
      found = true;
      return;
    }
  });

  var updatedApiary;

  if (found) {
    updatedApiary = await Apiary.findOneAndUpdate(
      { _id: req.params.apiary_id, "members.user": req.params.user_id },
      {
        $set: {
          "members.$.isOwner": req.body.isOwner,
        },
      },
      {
        new: true,
      }
    ).populate("members.user");
    res.status(200).json(updatedApiary);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// @status  WORKING
// @desc    Delete member from apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id
// @access  Private; owners of apiary only
const deleteMember = asyncHandler(async (req, res) => {
  const { user, isOwner, apiary } = await checkUserToApiary(req, res);

  // If not the owner or not the currently logged in user, unauthorized
  if (!isOwner || user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "User not authorized. User must be an owner of the apiary to update it"
    );
  }

  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $pull: {
        members: {
          user: req.params.user_id,
        },
      },
    }
  );

  if (!updatedApiary) {
    res.status(401);
    throw new Error("Member was not found");
  }

  res.status(200).json(updatedApiary);
});

module.exports = {
  getApiaries,
  setApiary,
  updateApiary,
  deleteApiary,
  setDevice,
  updateDevice,
  deleteDevice,
  setMember,
  updateMember,
  deleteMember,
};
