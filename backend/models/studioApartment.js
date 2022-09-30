const mongoose = require('mongoose');
// We export the base schema
const Listing = require('./listing')
const Schema = mongoose.Schema;

//Define the apartment schema
const studioApartmentSchema = new Schema({
    characteristics: {
        cleaningArea: {
            type: String,
            enum: ['Private', 'Communal']
        }
    }
});

// We inherit the fields from the base schema (Listing)
const studioApartmentModel = Listing.discriminator('StudioApartment', studioApartmentSchema, {
    discriminatorKey: 'type'
});

module.exports = studioApartmentModel;