const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/userController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');
const { logInValidator } = require('../middlewares/validateData');
const { body, validationResult } = require('express-validator');
const { validateCreate } = require('../validators/userValidator');

// Create different routes for each action and call the userController functions.
router.post('/register', upload.userPhoto, validateCreate, userController.createUser)
    .post('/login', body('user').isEmail(), userController.loginUser)
    .post('/logout', userController.logoutUser) 
    .put('/update', validateSession, /*validateUpdate,*/ upload.userPhoto, userController.updateUser);

module.exports = router;