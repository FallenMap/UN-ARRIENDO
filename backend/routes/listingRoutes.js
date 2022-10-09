const express = require('express');
const router = express.Router();
const {listingController} = require('../controllers/listingController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');
const organizeDataListing = require('../middlewares/organizeDataListing');
//const { validateCreateListing } = require('../validators/listingValidator');
//const { validateUpdateListing } = require('../validators/listingValidator');

// Create different routes for each action and call the publicationController functions.
router.get('/get', listingController.getListings);
router.post('/create', upload.listingPhotos, organizeDataListing, listingController.createListing);
router.post('/update', listingController.updateListing);
router.post('/delete', listingController.deleteListing);
router.post('/restore', listingController.restoreListing);
router.post('/rating', listingController.ratingListing);
router.get('/listingHistory', listingController.userListingHistory);
router.get('/get/:listingID', listingController.getListing) 

module.exports = router;

