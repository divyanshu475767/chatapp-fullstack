const express = require("express");
const router = express.Router();
const authentication = require('../middleware/auth.js');

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);


// group routes
router.get("/getAllUsers", userController.getAllUsers);
router.post("/createGroup",authentication.authenticate, userController.createGroup);
router.get("/getAllGroups",authentication.authenticate, userController.getAllGroups);



//admin routes


router.get("/getAllRemainingUsers/:groupId", userController.getAllRemainingUsers);
router.post("/newUsersAdd", userController.newUsersAdd);
router.get("/getAllGroupMembers/:groupId", userController.getAllGroupMembers);
router.post("/removeUsers", userController.removeUsers);
router.get("/getAllNonAdmins/:groupId",authentication.authenticate, userController.getAllNonAdmins);
router.get("/checkAdmin/:groupId",authentication.authenticate, userController.checkAdmin);

router.post("/addAdmins", userController.addAdmins);






module.exports = router;
