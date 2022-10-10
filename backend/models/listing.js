const { ObjectId } = require('mongodb');
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
    landlord: ObjectId,
    shared: Boolean,
    characteristics: {
        furnished: Boolean,
        stratum: Number,
        privateArea: Number,
        rooms: Number,
        privateBathrooms: Number,
        petFriendly: Boolean,
        carParking: Boolean,
        bicycleParking: Boolean,
        storage: String,
        communalAreas: {
            type: Array,
            of: String
        }
    },
    photos: {
        type: Array,
        of: String
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewedByTenants:  mongoose.SchemaTypes.Mixed,
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
}, { discriminatorKey: 'type' });


module.exports = mongoose.model('Listing', listingSchema);