const express = require('express');
const router = express.Router();
const {publicationController} = require('../controllers/publicationController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');

// Create different routes for each action and call the publicationController functions.
router.post('/create', upload.listingPhotos, publicationController.createPublication);


module.exports = router;

