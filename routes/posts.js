const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

//GET /posts/new - New Posts Route
router.get('/new', postsController.new)

//POST /posts - Create Route
router.post('/', postsController.create);

module.exports = router;