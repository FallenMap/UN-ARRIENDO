const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/userController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');
const { logInValidations } = require('../middlewares/validateData');
const { validateRegisterUser/*, validationUpdateUser*/ } = require('../validators/userValidator');

// Create different routes for each action and call the userController functions.
router.post('/register', upload.userPhoto, validateRegisterUser,userController.createUser)
    .post('/login', logInValidations, userController.loginUser)
    .post('/logout', userController.logoutUser) 
    .get('/get/:userPubID', userController.getUser) 
    .put('/update', validateSession, /*validationUpdateUser,*/ upload.userPhoto, userController.updateUser);

module.exports = router;