const asyncHandler = require("express-async-handler");
const Organization = require("../models/apiary.model.js");
const DataPoint = require("../models/data.model.js");

// @status  WIP
// @desc    Upload data point
// @route   GET /api/data/:apiary_id/:device_id/
// @access  public at this point
// If param `limit` is specified, return past `limit` data, otherwise, return 100 datapoints
// If there does not exist `limit` data, give HTTP 204

const getData = asyncHandler(async (req, res) => {
  const datapointNumLimit =
    req.params["limit"] !== undefined ? req.params["limit"] : 100;
  try {
    const dataPoints = await DataPoint.find()
      // TODO: filter data according to apiary_id and device_id
      // perhaps make only one apiary id and device id
      .sort({ time: "desc" })
      .limit(datapointNumLimit)
      .exec();
    if (dataPoints.length < datapointNumLimit) {
      res.status(204).send();
    } else {
      res.status(200).JSON(dataPoints);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @status  WIP
// @desc    Upload data point
// @route   POST /api/data/:apiary_id/:device_id/
// @access  public at this point

const postData = asyncHandler(async (req, res) => {
  // const { raw_activity, type, x, y, weather, type,  temp, humidity, windspeed } = req.body;

  // TODO: update data according to apiary_id and device_id
  // will just make datapoints for one organization id and device id

  const dataPoint = await DataPoint.create(req.body);
  if (dataPoint) {
    console.log("TESTING JSON OBJECT PRINTING AND UPLOAD TO MONGODB\n");
    console.log(JSON.stringify(dataPoint) + "\n");
    res.status(201).JSON(dataPoint);
  } else {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  getData,
  postData,
};
