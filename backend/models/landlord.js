const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define a schema
const landlordSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    user: String, // possible _id for mongo
    password: String, // temp, depends on login implementation
    Whatsapp: String,
    Telegram: String,
    Facebook: String,
    birthDate: Date,
    businessHours: String,
    description: String
    //Foto: String //path del archivo subido
});

module.exports = mongoose.model('landlord', landlordSchema);

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
