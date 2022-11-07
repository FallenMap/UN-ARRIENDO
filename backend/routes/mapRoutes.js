const express = require('express');
const router = express.Router();
const {getListingsMap} = require('../controllers/mapController');

router.get('/listings', getListingsMap);

module.exports = router;