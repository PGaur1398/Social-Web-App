const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.post('/create',postController.create);

module.exports = router;