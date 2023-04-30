const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/:userId', ensureLoggedIn, usersController.show);

router.get('/:userId/edit', ensureLoggedIn, usersController.edit);

router.put('/:userId', ensureLoggedIn, usersController.update);

module.exports = router;
