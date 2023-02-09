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

router.get("/", protect, getDevices);
router.post("/", protect, setDevice);
router.put("/:id", protect, updateDevice);
router.delete("/:id", protect, deleteDevice);

module.exports = router;
