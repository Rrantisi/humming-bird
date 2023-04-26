const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// DELETE /comments

router.post('/posts/:id/comments', ensureLoggedIn, commentsController.create);

router.get('/posts/:id/comments/:commentId/edit', ensureLoggedIn, commentsController.edit);

router.put('/posts/:id/comments/:commentId', ensureLoggedIn, commentsController.update);

router.delete('/posts/:id/comments/:commentId', ensureLoggedIn, commentsController.delete);

module.exports = router;