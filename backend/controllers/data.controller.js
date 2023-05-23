const asyncHandler = require("express-async-handler");
const Apiary = require("../models/apiary.model.js");
const Data = require("../models/data.model.js");

// get n last data points from array
const getData = asyncHandler(async (req, res) => {
  const limit = req.query.limit === undefined ? 100 : req.query.limit;

  // Check if device exists
  const deviceExists = await Apiary.findOne({
    devices: {
      $elemMatch: {
        serial: req.params.serial,
      },
    },
  });

  // If !deviceExists, error
  if (!deviceExists) {
    res.status(400);
    throw new Error("Device does not exist");
  }

  const data = await Data.findOne({ serial: req.params.serial }, {datapoints: { $slice: -limit }});

  if (limit > data.datapoints.length) {
    res.status(204).send();
    return;
  }

  res.status(200).json(data.datapoints);
});

// @status  DONE
// @desc    Upload data point
// @route   POST /api/data/serial/:serial
// @access  NEEDS PROTECTION (ML TEAM AUTHORIZED ONLY)
const putData = asyncHandler(async (req, res) => {
  let {
    time,
    raw_activity,
    weather,
    prediction_activity,
    last_prediction_deviation,
  } = req.body;

  last_prediction_deviation ??= 0;

  // Check if device exists
  const deviceExists = await Apiary.findOne({
    devices: {
      $elemMatch: {
        serial: req.params.serial,
      },
    },
  });

  // If !deviceExists, error
  if (!deviceExists) {
    res.status(400);
    throw new Error("Device does not exist");
  }

  const updatedReport = await Data.updateOne(
    { serial: req.params.serial },
    {
      $push: {
        datapoints: {
          time: time,
          raw_activity: raw_activity,
          weather: weather,
          prediction_activity: prediction_activity,
          last_prediction_deviation: last_prediction_deviation,
        },
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedReport);
});

module.exports = {
  getData,
  putData,
};
