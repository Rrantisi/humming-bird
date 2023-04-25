const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/posts/:id/comments', commentsController.create);

// DELETE /reviews
router.delete('/posts/:id/comments/:commentId', commentsController.delete);

module.exports = router;