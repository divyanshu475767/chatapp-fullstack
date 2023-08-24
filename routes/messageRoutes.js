const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const authentication = require('../middleware/auth.js');

router.post('/message',authentication.authenticate,messageController.postMessage);

router.get('/getMessages/:groupId',messageController.getMessage);


module.exports = router;
