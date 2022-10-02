const { body } = require('express-validator');

const logInValidations = [body('user').isEmail()];

function registerValidations(){
    return [];
}

module.exports = {
    logInValidations,
    registerValidations
}