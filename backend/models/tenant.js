const mongoose = require('mongoose');
// We export the base schema
const User = require('./user')
const Schema = mongoose.Schema;

//Define the tenant schema
const tenantSchema = new Schema({
    cityBirth: String,
    degree: String,
});

// We inherit the fields from the base schema (User)
const tenantModel = User.discriminator('Tenant', tenantSchema, {
    discriminatorKey: 'type'
});

module.exports = tenantModel;

