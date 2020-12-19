const express = require('express');
const router = express.Router();
const friendRequestController = require('../controller/friendRequestController');


router.post('/friend-request/:id',friendRequestController.createRequest);

module.exports = router;