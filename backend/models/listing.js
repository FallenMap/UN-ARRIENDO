const mongoose = require('mongoose');

// We define the base listing scheme
const listingSchema = new mongoose.Schema({
    title: String,
    address: String, // Street address
    address2: String, // building, apartment, room, lot, etc
    neighborhood: String,
    latitude: Number,
    longitude: Number,
    timeToUN: Number,
    price: Number,
    description: String,
    landlord: String,
    shared: Boolean,
    characteristics: {
        furnished: Boolean,
        stratum: Number,
        privateArea: Number,
        rooms: Number,
        privateBathrooms: Number,
        petFriendly: {
            type: Array,
            of: String
        },
        carParking: Number,
        bicycleParking: Number,
        storage: String,
        communalAreas: {
            type: Array,
            of: String
        }
    },
    photos: {
        type: Array,
        of: String
    }
}, { discriminatorKey: 'type' });

module.exports = mongoose.model('Listing', listingSchema);