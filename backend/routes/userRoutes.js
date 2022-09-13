const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/userController');
const validateSession = require('../middlewares/validateSession');
const path = require('path');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/userPhotos/'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExtension = file.mimetype.split('/')[1]
      cb(null, uniqueSuffix + '.' + fileExtension)
    }
    
  })
  
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Create different routes for each action and call the userController functions.
router.post('/register', upload.single('photo'), userController.createUser)
    .post('/login', userController.loginUser)
    .get('/logout', userController.logoutUser) 
    .put('/update', validateSession, userController.updateUser);

module.exports = router;