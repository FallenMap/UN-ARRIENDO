const mongoose = require('mongoose');

// We define the base scheme (can be seen as the father scheme)
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    user: {
        type: String,
        unique: true
    },
    password: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Not specified']
    },
    birthDate: Date,
    description: String
    //Foto: String //path del archivo subido
}, { discriminatorKey: 'type' });

module.exports = mongoose.model('User', userSchema);