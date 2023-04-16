const router = require("express").Router();
const { putData } = require("../controllers/data.controller.js");

router.put("/serial/:serial", putData);

module.exports = router;
