const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const User = require('../models/user');

const validateCreate = [  //validate user & email
    check('firstName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('First name input is empty'),

    check('lastName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Last name input is empty'),

    check('email')
        .exists()
        .isEmail()
        .withMessage('Input is not an email')/////////////////////////////////////////////////////////////////////////////////////
        .custom(async value => {
            let email_resp;

            let query = {
                email: value
            }

            try {
                email_resp = await User.findOne(query);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "Something went wrong while trying to connect to the database"
                });
            }

            if (email_resp) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "This email is already in use"
                });
            }
        })
        .withMessage('This email is already in use'),//////////////////////////////////////////////////////////////////////////////

    check('user')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Username input is empty')/////////////////////////////////////////////////////////////////////////////////////
        .custom(async (value, { res }) => {
            let user_resp;

            let query = {
                user: value
            }

            try {
                user_resp = await User.findOne(query);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "Something went wrong while trying to connect to the database"
                });
            }

            if (user_resp) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "This user is already in use"
                });
            }
        })
        .withMessage('This user is already in use'), //////////////////////////////////////////////////////////////////////////////
        
    check('gender')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Gender input is empty'),
    
    check('password')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Password input is empty'),
    
    check('role')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Role input is empty'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdate = [  //validate user unique & email unique
    check('firstName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('First name input is empty'),

    check('lastName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Last name input is empty'),

    check('email')
        .exists()
        .isEmail()
        .withMessage('Input is not an email')/////////////////////////////////////////////////////////////////////////////////////
        .custom(async value => {
            let email_resp;

            let query = {
                email: value
            }

            try {
                email_resp = await User.findOne(query);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "Something went wrong while trying to connect to the database"
                });
            }

            if (email_resp) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "This email is already in use"
                });
            }
        })
        .withMessage('This email is already in use'),//////////////////////////////////////////////////////////////////////////////

    check('user')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Username input is empty')/////////////////////////////////////////////////////////////////////////////////////
        .custom(async (value, { res }) => {
            let user_resp;

            let query = {
                user: value
            }

            try {
                user_resp = await User.findOne(query);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "Something went wrong while trying to connect to the database"
                });
            }

            if (user_resp) {
                console.log(error);
                return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
                    error: "This user is already in use"
                });
            }
        })
        .withMessage('This user is already in use'), //////////////////////////////////////////////////////////////////////////////
        
    check('gender')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Gender input is empty'),
    
    check('password')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Password input is empty'),
    
    check('role')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Role input is empty'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }
module.exports = { validateUpdate }