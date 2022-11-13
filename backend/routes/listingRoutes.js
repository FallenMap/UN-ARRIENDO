const express = require('express');
const router = express.Router();
const {listingController} = require('../controllers/listingController');
const validateSession = require('../middlewares/validateSession');
const upload = require('../middlewares/fileUpload');
const organizeDataListing = require('../middlewares/organizeDataListing');
//const { validateCreateListing } = require('../validators/listingValidator');
//const { validateUpdateListing } = require('../validators/listingValidator');

// Create different routes for each action and call the publicationController functions.
router.get('/get', validateSession, listingController.getListings);
router.post('/create', validateSession, upload.listingPhotos, organizeDataListing, listingController.createListing);
router.post('/update', validateSession, organizeDataListing, listingController.updateListing);
router.post('/delete/:listingID', validateSession, listingController.deleteListing);
router.post('/restore', validateSession, listingController.restoreListing);
router.post('/rating', validateSession, listingController.ratingListing);
router.post('/comment', validateSession, listingController.commentListing);
router.put('/commentUpdate', validateSession, listingController.updateListingComment);
router.post('/commentDelete', validateSession, listingController.deleteListingComment);
router.get('/listingHistory', validateSession, listingController.userListingHistory);
router.get('/get/:listingID', validateSession, listingController.getListing);
router.get('/filter', validateSession, listingController.filterListing);
router.get('/search', validateSession, listingController.searchListings);

module.exports = router;

