const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreateListing = [
    check(title)
    .exist()
    .not()
    .isEmpty()
    .withMessage('Title'),

    check(adress)
    .exist()
    .not()
    .isEmpty()
    .withMessage('Adress'),

    check(adress2)
    .exist()
    .not()
    .isEmpty()
    .withMessage('Adress2'),

    check(neighborhood)
    .exist()
    .not()
    .isEmpty()
    .withMessage('neighborhood'),

    check(latitude)
    .exist()
    .not()
    .isEmpty()
    .withMessage('latitude'),

    check(longitude)
    .exist()
    .not()
    .isEmpty()
    .withMessage('longitude'),

    check(timeToUN)
    .exist()
    .not()
    .isEmpty()
    .withMessage('timeToUN'),

    check(price)
    .exist()
    .not()
    .isEmpty()
    .withMessage('price'),

    check(description)
    .exist()
    .not()
    .isEmpty()
    .withMessage('description'),

    check(landlord)
    .exist()
    .not()
    .isEmpty()
    .withMessage('landlord'),

    check(shared)
    .exist()
    .not()
    .isEmpty()
    .withMessage('landlord'),

    check(photos)
    .exist()
    .not()
    .isEmpty()
    .withMessage('photos'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

//const validateUpdateListing = []

module.exports = { validateCreateListing }
//module.exports = { validateUpdateListing }