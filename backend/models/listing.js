const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    firstNameUser: String,
    lastNameUser: String,
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    idUser: {
        type: ObjectId,
        required: true
    }
})

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
        privateBathrooms: Number,
        petFriendly: Boolean,
        carParking: Boolean,
        bicycleParking: Boolean,
        storage: String,
        communalAreas: String
    },
    photos: {
        type: Array,
        of: String
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewedByTenants:  {
        type: mongoose.SchemaTypes.Mixed,
        default: {"-1":-1}
    },
    comments: [commentSchema],
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
}, { discriminatorKey: 'type' }, {minimize: false});


module.exports = mongoose.model('Listing', listingSchema);