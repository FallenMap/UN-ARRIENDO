const express = require('express');
const router = express.Router();
const {getImageProfile, getImageListing, getImageProfileById} = require('../controllers/imageController');


router.get('/profile/:image', getImageProfile)
    .get('/listing/:image', getImageListing)
    .get('/profile/id/:id', getImageProfileById);

module.exports=router;