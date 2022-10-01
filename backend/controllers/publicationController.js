// importing libraries
const Apartment = require('../models/apartment');
const Listing = require('../models/listing');
const Room = require('../models/room');
const StudioApartment = require('../models/studioApartment');
const fs = require('fs');
const path = require('path');

// Create an object that save all controller functions.
const publicationController = {};

// Function to create a new publication.
publicationController.createPublication = async (req, res) => {
    if (!req.files) {
        req.body.photos = [];
    } else {
        let arrayPhotos = [];
        req.files.forEach(element => {
            arrayPhotos.push(path.win32.basename(element.path))
        });
        req.body.photos = arrayPhotos;
    }

    let publication;

    if ((req.body.type).toLowerCase() == "apartment") {
        delete req.body.type;
        publication = new Apartment({ ...req.body });
    } else if ((req.body.type).toLowerCase() == "room") {
        delete req.body.type;
        publication = new Room({ ...req.body });
    }else if((req.body.type).toLowerCase() == "studioapartment"){
        delete req.body.type;
        publication = new StudioApartment({ ...req.body });   
    }

    await publication.save();

    res.status(200).json({
        msg: "Publication created",
    });
};

// Function to update a publication.
publicationController.updatePublication = async (req, res) => {};

// Function to delete a publication.
publicationController.deletePublication = async (req, res) => {};

// Function to save a rating of a publication.
publicationController.ratingPublication = async (req, res) => {};

// Function to get user post history.
publicationController.userPostHistory = async (req, res) => {};

module.exports = { publicationController };