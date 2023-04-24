const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/posts/:id/comments', commentsController.create);

module.exports = router;