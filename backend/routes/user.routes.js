const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/user.controller.js");
const { protect } = require("../middleware/auth.middleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
