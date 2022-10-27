const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
});

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
    photo: String,
    reviews: [reviewSchema]
}, { discriminatorKey: 'type' });

module.exports = mongoose.model('User', userSchema);