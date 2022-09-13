const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/userController');
const validateSession = require('../middlewares/validateSession');

// Create different routes for each action and call the userController functions.
router.post('/register', userController.createUser)
    .post('/login', userController.loginUser)
    .get('/logout', userController.logoutUser) 
    .put('/update', validateSession, userController.updateUser);

module.exports = router;