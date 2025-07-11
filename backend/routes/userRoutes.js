const express = require("express");
const router = express.Router();
const {registerUser, loginUser, fetchProfile} = require("../controller/userRouteController");
const verifyToken = require("../middleware/authorizationHandler")


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", verifyToken ,fetchProfile);


module.exports = router;
