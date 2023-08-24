const express = require("express");
const router = express.Router();
const authentication = require('../middleware/auth.js');

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);


// gropu routes
router.get("/getAllUsers", userController.getAllUsers);
router.post("/createGroup", userController.createGroup);
router.get("/getAllGroups",authentication.authenticate, userController.getAllGroups);





module.exports = router;
