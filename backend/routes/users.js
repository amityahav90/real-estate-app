const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.put('/:id', UserController.updateUser);

router.get('', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.delete('/:id', UserController.deleteUser);

// router.post('/login', UserController.loginUser);

module.exports = router;
