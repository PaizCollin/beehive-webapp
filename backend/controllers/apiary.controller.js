const asyncHandler = require("express-async-handler");
const Apiary = require("../models/apiary.model.js");
const User = require("../models/user.model");
const Data = require("../models/data.model");
const mongoose = require("mongoose");

// @status  WORKING
// @desc    Check that user is part of apiary
// @return  Returns a user_id, role, and apiary
async function checkUserToApiary(req, res) {
  // Find apiary from param :apiary_id
  const apiary = await Apiary.findById(req.params.apiary_id);

  console.log(apiary);

  // If apiary not found, error
  if (!apiary) {
    res.status(400);
    throw new Error("Apiary not found");
  }

  // Check for user (logged in essentially, from protect)
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches a member of this apiary and is an admin
  var user;
  var role;
  apiary.members.forEach((member) => {
    if (member.user.toString() === req.user.id) {
      user = member.user;
      role = member.role;
      return;
    }
  });

  return { user, role, apiary };
}

// @status  WORKING
// @desc    Get apiaries (no device data)
// @route   GET /api/apiaries
// @access  Private; all users
const getApiaries = asyncHandler(async (req, res) => {
  // Find apiaries where current user (from protect) is a member
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
// @desc    Get apiaries (with device data)
// @route   GET /api/apiaries/filter/:filter
// @access  Private; all users
const getApiaryWithDeviceData = asyncHandler(async (req, res) => {
  const filter = req.params.filter; // Assuming the filter parameter is passed as a query parameter

  // console.log(filter);

  let fromDate;
  switch (filter) {
    case "init":
      fromDate = new Date(Date.now()); // Unix epoch (oldest date)
      break;
    case "1day":
      fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // One day ago
      break;
    case "1week":
      fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // One week ago
      break;
    case "1month":
      fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // One month ago
      break;
    case "3month":
      fromDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // Three months ago
      break;
    case "6month":
      fromDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); // Six months ago
      break;
    case "1year":
      fromDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // One year ago
      break;
    case "2year":
      fromDate = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000); // Two years ago
      break;
    default:
      // No filter or invalid filter, fetch all-time data
      fromDate = new Date(0); // Unix epoch (oldest date)
      break;
  }

  const apiaries = await Apiary.find({
    members: { $elemMatch: { user: req.user.id } },
  }).populate("members.user");

  const updatedApiaries = await Promise.all(
    apiaries.map(async (apiary) => {
      const devices = apiary.devices;

      const updatedDevices = await Promise.all(
        devices.map(async (device) => {
          const data = await Data.aggregate([
            { $match: { _id: device.data } },
            {
              $project: {
                _id: 0,
                datapoints: {
                  $filter: {
                    input: "$datapoints",
                    as: "point",
                    cond: { $gte: ["$$point.time", fromDate] },
                  },
                },
              },
            },
            {
              $addFields: {
                dataSize: { $size: "$datapoints" },
                interval: {
                  $max: [
                    1,
                    { $ceil: { $divide: [{ $size: "$datapoints" }, 1000] } },
                  ],
                },
              },
            },
            {
              $project: {
                selectedData: {
                  $reduce: {
                    input: { $range: [0, "$dataSize", "$interval"] },
                    initialValue: [],
                    in: {
                      $concatArrays: [
                        "$$value",
                        [
                          {
                            $arrayElemAt: ["$datapoints", "$$this"],
                          },
                        ],
                      ],
                    },
                  },
                },
              },
            },
          ]);

          return {
            _id: device._id,
            serial: device.serial,
            name: device.name,
            remote: device.remote,
            data: {
              datapoints: data.length > 0 ? data[0].selectedData : [],
            },
          };
        })
      );

      return {
        _id: apiary._id,
        name: apiary.name,
        location: apiary.location,
        members: apiary.members,
        devices: updatedDevices,
      };
    })
  );

  res.status(200).json(updatedApiaries);
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
  // .create won't work
  // find by an empty id (won't find one), so instead of updating, it "upserts" (creates) a new one
  const apiary = await Apiary.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId() },
    {
      name: name,
      location: location,
      members: {
        user: req.user.id,
        role: "CREATOR",
      },
      devices: [],
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("members.user");

  res.status(200).json(apiary);
});

// @status  WORKING
// @desc    Update apiary
// @route   PUT /api/apiaries/:apiary_id
// @access  Private; admins of apiary only
const updateApiary = asyncHandler(async (req, res) => {
  const { user, role } = await checkUserToApiary(req, res);

  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
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
// @access  Private; creator of apiary only
const deleteApiary = asyncHandler(async (req, res) => {
  const { user, role, apiary } = await checkUserToApiary(req, res);

  // If not the creator or not the currently logged in user, unauthorized
  if (role != "CREATOR" || user.toString() !== req.user.id) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be the original creator of the apiary to delete it"
    );
  }

  // Delete all data associated with apiary
  await Data.deleteMany({ apiary: apiary._id });

  // Delete apiary
  await apiary.remove();

  res.status(200).json({ _id: req.params.apiary_id });
});

// @status  WORKING
// @desc    Set device
// @route   PUT /api/apiaries/device/:apiary_id
// @access  Private; admins of apiary only
const setDevice = asyncHandler(async (req, res) => {
  const { user, role } = await checkUserToApiary(req, res);
  const { serial, name, remote } = req.body;

  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
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
    res.status(400);
    throw new Error("Device already exists");
  }

  const newData = await Data.create({
    serial: serial,
    apiary: req.params.apiary_id,
    data: {},
  });

  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $push: {
        devices: {
          serial: serial,
          name: name,
          remote: remote,
          data: newData._id,
        },
      },
    },
    {
      new: true,
    }
  ).populate("members.user");

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Update device
// @route   PUT /api/apiaries/device/:apiary_id&:device_id
// @access  Private; admins of apiary only
const updateDevice = asyncHandler(async (req, res) => {
  const { user, role } = await checkUserToApiary(req, res);
  const { serial, name, remote } = req.body;

  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
    );
  }

  const updatedApiary = await Apiary.findOneAndUpdate(
    { _id: req.params.apiary_id, "devices._id": req.params.device_id },
    {
      $set: {
        "devices.$.name": name,
        "devices.$.remote": remote,
      },
    },
    {
      new: true,
    }
  ).populate("members.user");

  if (!updatedApiary) {
    res.status(400);
    throw new Error("Device was not found");
  }

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Delete device
// @route   DELETE /api/apiaries/device/:apiary_id&:device_id
// @access  Private; admins of apiary only
const deleteDevice = asyncHandler(async (req, res) => {
  const { user, role } = await checkUserToApiary(req, res);

  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
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
    },
    {
      new: true,
    }
  ).populate("members.user");

  if (!updatedApiary) {
    res.status(400);
    throw new Error("Device was not found");
  }

  const deletedData = await Data.findOneAndDelete({
    serial: req.params.serial,
  });

  res.status(200).json(updatedApiary);
});

// @status  WORKING
// @desc    Update members to apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id&setEditor
// @access  Private; admins of apiary only
const setMember = asyncHandler(async (req, res) => {
  const { user, role, apiary } = await checkUserToApiary(req, res);

  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
    );
  }

  const newMember = await User.findOne({ email: req.body.email });
  var found = false;
  apiary.members.forEach((member) => {
    if (member.user._id.toString() === newMember._id.toString()) {
      found = true;
      res.status(400);
      throw new Error("User is already a member of this apiary");
    }
  });

  var updatedApiary;

  if (!found && req.body.role != "CREATOR") {
    // Push the new member :user_id to the apiary :apiary_id
    updatedApiary = await Apiary.findByIdAndUpdate(
      { _id: req.params.apiary_id },
      {
        $push: {
          members: {
            user: newMember,
            role: req.body.role,
          },
        },
      },
      {
        new: true,
      }
    ).populate("members.user");

    res.status(200).json(updatedApiary);
  } else {
    res.status(400);
    throw new Error("User role cannot be set to CREATOR");
  }
});

// @status  WORKING
// @desc    Update members to apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id&setOwner
// @access  Private; admins of apiary only
const updateMember = asyncHandler(async (req, res) => {
  const { user, role, apiary } = await checkUserToApiary(req, res);
  // If not an admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
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

  if (found && req.body.role != "CREATOR") {
    updatedApiary = await Apiary.findOneAndUpdate(
      { _id: req.params.apiary_id, "members.user": req.params.user_id },
      {
        $set: {
          "members.$.role": req.body.role,
        },
      },
      {
        new: true,
      }
    ).populate("members.user");
    res.status(200).json(updatedApiary);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @status  WORKING
// @desc    Delete member from apiary
// @route   PUT /api/apiaries/member/:apiary_id&:user_id
// @access  Private; admins of apiary only
const deleteMember = asyncHandler(async (req, res) => {
  const { user, role, apiary } = await checkUserToApiary(req, res);

  // If not the admin or not the currently logged in user, unauthorized
  if (
    (role != "CREATOR" && role != "ADMIN") ||
    user.toString() !== req.user.id
  ) {
    res.status(400);
    throw new Error(
      "User not authorized. User must be an admin of the apiary to update it"
    );
  }

  apiary.members.forEach((member) => {
    if (
      member.user.toString() === req.params.user_id &&
      member.role == "CREATOR"
    ) {
      res.status(400);
      throw new Error("The creator of the apiary cannot be deleted");
    }
  });

  const updatedApiary = await Apiary.findByIdAndUpdate(
    { _id: req.params.apiary_id },
    {
      $pull: {
        members: {
          user: req.params.user_id,
        },
      },
    },
    {
      new: true,
    }
  ).populate("members.user");

  if (!updatedApiary) {
    res.status(400);
    throw new Error("Member was not found");
  }

  res.status(200).json(updatedApiary);
});

module.exports = {
  getApiaries,
  getApiaryWithDeviceData,
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
