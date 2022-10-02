const { body } = require('express-validator');

function logInValidations(){
    return [body('user').isEmail()];
}

function registerValidations(){
    return [];
}

module.exports = {
    logInValidations,
    registerValidations
}