const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/posts/:id/comments', commentsController.create);

// DELETE /reviews
router.delete('/comments/:id', commentsController.delete);

module.exports = router;