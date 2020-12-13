const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const likesController = require('../controller/likesController');

router.post('/create',postController.create);
router.get('/destroy/:id',postController.destroy)
router.post('/likes/toggle',likesController.toggleLike);
module.exports = router;