const express = require('express');
const router = express.Router();
const {getImageProfile, getImageListing} = require('../controllers/imageController');


router.get('/profile/:image', getImageProfile)
    .get('/listing/image/:image', getImageListing);

module.exports=router;