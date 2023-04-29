const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/:userId', ensureLoggedIn, usersController.show);

module.exports = router;
