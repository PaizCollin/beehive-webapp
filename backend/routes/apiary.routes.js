const router = require("express").Router();
const {
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
} = require("../controllers/apiary.controller.js");

const { protect } = require("../middleware/auth.middleware");

// apiary requests
router.get("/", protect, getApiaries);
router.get("/filter/:filter", protect, getApiaryWithDeviceData);
router.post("/", protect, setApiary);
router.put("/apiary/:apiary_id", protect, updateApiary);
router.delete("/apiary/:apiary_id", protect, deleteApiary);

// device requests
router.put("/apiary/:apiary_id/setdevice", protect, setDevice);
router.put(
  "/apiary/:apiary_id/device/:device_id/updatedevice",
  protect,
  updateDevice
);
router.put(
  "/apiary/:apiary_id/device/:device_id/serial/:serial/deletedevice",
  protect,
  deleteDevice
);

// member requests
router.put("/apiary/:apiary_id/setmember", protect, setMember);
router.put(
  "/apiary/:apiary_id/user/:user_id/updatemember",
  protect,
  updateMember
);
router.put(
  "/apiary/:apiary_id/user/:user_id/deletemember",
  protect,
  deleteMember
);

module.exports = router;
