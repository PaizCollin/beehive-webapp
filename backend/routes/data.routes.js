const router = require("express").Router();
const { getData, putData } = require("../controllers/data.controller.js");

router.get("/serial/:serial", getData);
router.put("/serial/:serial", putData);

module.exports = router;
