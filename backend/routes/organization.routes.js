const router = require("express").Router();
const {
  getOrgs,
  setOrg,
  updateOrg,
  deleteOrg,
} = require("../controllers/organization.controller.js");
let User = require("../models/user.model.js");

router.get("/", getOrgs);
router.post("/", setOrg);
router.put("/:id", updateOrg);
router.delete("/:id", deleteOrg);

module.exports = router;
