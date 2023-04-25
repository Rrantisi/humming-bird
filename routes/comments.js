const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/posts/:id/comments', commentsController.create);

// DELETE /reviews
router.delete('/posts/:id/comments/:commentId', commentsController.delete)

// EDIT / posts
router.get('/posts/:id/comments/:commentId/edit', commentsController.edit);

module.exports = router;