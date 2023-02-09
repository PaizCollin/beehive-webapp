const router = require("express").Router();
const {
  getOrgs,
  setOrg,
  updateOrg,
  deleteOrg,
} = require("../controllers/organization.controller.js");
let User = require("../models/user.model.js");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getOrgs);
router.post("/", protect, setOrg);
router.put("/:org_id", protect, updateOrg);
router.delete("/:org_id", protect, deleteOrg);

module.exports = router;
