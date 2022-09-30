const mongoose = require('mongoose');
// We export the base schema
const Listing = require('./listing')
const Schema = mongoose.Schema;

//Define the apartment schema
const roomSchema = new Schema({
    housemates: {
        type: String,
        enum: ['Family', 'Dormitory']
    },
    characteristics: {
        publicArea: Number,
        sharedBathrooms: Number,
        sharedKitchen: Boolean,
        sharedCleaningArea: Boolean,
        includedServices: {
            type: Array,
            of: String
        },
        genderSpecific: {
            type: Array,
            of: String
        },
        curfew: String
    }
});

// We inherit the fields from the base schema (Listing)
const roomModel = Listing.discriminator('Room', roomSchema, {
    discriminatorKey: 'type'
});

module.exports = roomModel;