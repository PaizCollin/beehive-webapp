const router = require("express").Router();
const {
  getDevices,
  setDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/device.controller.js");
let User = require("../models/user.model.js");
let Org = require("../models/organization.model.js");

const { protect } = require("../middleware/auth.middleware");

router.get("/:org_id", protect, getDevices);
router.post("/:org_id", protect, setDevice);
router.put("/:org_id/:device_id", protect, updateDevice);
router.delete("/:org_id/:device_id", protect, deleteDevice);

module.exports = router;
