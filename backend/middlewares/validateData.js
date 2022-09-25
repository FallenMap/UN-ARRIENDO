const { body, validationResult } = require('express-validator');

module.exports.logInValidations = [body('user').isEmail()];

module.exports.registerValidations = [];