var express = require("express");
var router = express.Router();
const userController = require("./userController");
const { registerValidator, loginValidator, profileUpdateValidator } = require("./userValidator");
const { isAuthenticated } = require("../../middlewares/auth");   // const authMiddleware = require("../../middlewares/auth");
const profileMulter = require("../../middlewares/profileMulter"); // const upload = require("../../middlewares/profileMulter");
const asyncHandler = require("../../middlewares/asyncHandler"); 



router.get("/register", userController.renderRegisterForm);
router.post("/register", registerValidator, asyncHandler(userController.register));

router.get("/login", userController.renderLoginForm);
router.post("/login", loginValidator, asyncHandler(userController.login));
router.get("/logout", userController.logout);

router.get("/profile/edit", isAuthenticated, asyncHandler(userController.renderEditProfileForm));
router.post("/profile/edit", isAuthenticated, profileMulter.single("profilePicture"), profileUpdateValidator, asyncHandler(userController.updateProfile));
router.get("/profile/:username", isAuthenticated, asyncHandler(userController.renderPublicProfile));

router.get("/feed", isAuthenticated, asyncHandler(userController.renderFeed));



module.exports = router;