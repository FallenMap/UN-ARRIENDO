const express = require('express');
const router = express.Router();
const {listingController} = require('../controllers/listingController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');
const organizeDataListing = require('../middlewares/organizeDataListing');

// Create different routes for each action and call the publicationController functions.
router.post('/create', upload.listingPhotos, organizeDataListing, listingController.createListing);
router.post('/update', listingController.updateListing);
router.post('/delete', listingController.deleteListing);
router.post('/rating', listingController.ratingListing);
router.post('/postHistory', listingController.userListingHistory);

module.exports = router;

