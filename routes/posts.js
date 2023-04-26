const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET /posts/new - New Posts Route
router.get('/new', ensureLoggedIn, postsController.new)

//POST /posts - Create Route
router.post('/', ensureLoggedIn, postsController.create);

//GET / - Index Route
router.get('/', postsController.index);

//GET /posts/:id - Show Route
router.get('/:id', postsController.show);

module.exports = router;