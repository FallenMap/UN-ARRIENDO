const express = require('express');
const router = express.Router();
const {publicationController} = require('../controllers/publicationController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');

// Create different routes for each action and call the publicationController functions.
router.post('/create', upload.listingPhotos, publicationController.createPublication);
router.post('/update', upload.listingPhotos, publicationController.updatePublication);
router.post('/delete', upload.listingPhotos, publicationController.deletePublication);
router.post('/rating', upload.listingPhotos, publicationController.ratingPublication);
router.post('/postHistory', upload.listingPhotos, publicationController.userPostHistory);
router.post('/get', upload.listingPhotos, publicationController.getPublications);

module.exports = router;

