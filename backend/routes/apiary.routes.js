const router = require("express").Router();
const {
  getApiaries,
  setApiary,
  updateApiary,
  deleteApiary,
  updateMembers,
} = require("../controllers/apiary.controller.js");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getApiaries);
router.post("/", protect, setApiary);
router.put("/:apiary_id&user_id&:isOwner", protect, updateMembers);
router.put("/:apiary_id", protect, updateApiary);
router.delete("/:apiary_id", protect, deleteApiary);

module.exports = router;
