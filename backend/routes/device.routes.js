const router = require("express").Router();
const {
  getDevices,
  getData,
  setDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/device.controller.js");

const { protect } = require("../middleware/auth.middleware");

router.get("/:org_id&:device_id", protect, getData);
router.get("/:org_id", protect, getDevices);
router.post("/:org_id", protect, setDevice);
router.put("/:org_id&:device_id", protect, updateDevice);
router.delete("/:org_id&:device_id", protect, deleteDevice);

module.exports = router;
