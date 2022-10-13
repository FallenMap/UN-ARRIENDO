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
        enum: ['Masculino', 'Femenino', 'Prefiero no especificar']
    },
    birthDate: Date,
    description: String,
    photo: String
}, { discriminatorKey: 'type' });

module.exports = mongoose.model('User', userSchema);