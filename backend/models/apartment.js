const mongoose = require('mongoose');
// We export the base schema
const Listing = require('./listing')
const Schema = mongoose.Schema;

//Define the apartment schema
const apartmentSchema = new Schema({
    characteristics: {
        kitchen: {
            type: String,
            enum: ['Open', 'Closed']
        }
    }
});

// We inherit the fields from the base schema (Listing)
const apartmentModel = Listing.discriminator('Apartment', apartmentSchema, {
    discriminatorKey: 'type'
});

module.exports = apartmentModel;