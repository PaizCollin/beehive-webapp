const router = require("express").Router();
const { getData, postData } = require("../controllers/data.controller.js");

// router.get("/:apiary_id/:device_id/", getData);
router.post("/:apiary_id/:device_id/", postData);

module.exports = router;
