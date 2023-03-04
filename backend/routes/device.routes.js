const router = require("express").Router();
const {
  getDevices,
  getData,
  setDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/device.controller.js");

const { protect } = require("../middleware/auth.middleware");

router.get("/:apiary_id&:device_id", protect, getData);
router.get("/:apiary_id", protect, getDevices);
router.post("/:apiary_id", protect, setDevice);
router.put("/:apiary_id&:device_id", protect, updateDevice);
router.delete("/:apiary_id&:device_id", protect, deleteDevice);

module.exports = router;
