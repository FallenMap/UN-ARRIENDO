const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/userController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');

// Create different routes for each action and call the userController functions.
router.post('/register', upload.userPhoto, userController.createUser)
    .post('/login', userController.loginUser)
    .get('/logout', userController.logoutUser) 
    .put('/update', validateSession, upload.userPhoto, userController.updateUser);

module.exports = router;