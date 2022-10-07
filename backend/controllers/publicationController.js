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
publicationController.updatePublication = async (req, res) => {
    // handle photos
    if (!req.files) {
        req.body.photos = [];
    } else {
        let arrayPhotos = [];
        req.files.forEach(element => {
            arrayPhotos.push(path.win32.basename(element.path))
        });
        req.body.photos = arrayPhotos;
    }
    //updating
    if ((req.body.type).toLowerCase() == "apartment") {
        try {
            await Apartment.updateOne({ _id: req.body.publicationID }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    } else if ((req.body.type).toLowerCase() == "room") {
        try {
            await Room.updateOne({ _id: req.body.publicationID }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    } else if ((req.body.type).toLowerCase() == "studioapartment") {
        try {
            await StudioApartment.updateOne({ _id: req.body.publicationID }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    }
    res.status(200).json({
        msg: "Updated!"
    });
};

// Function to delete a publication.
publicationController.deletePublication = async (req, res) => {};

// Function to save a rating of a publication.
publicationController.ratingPublication = async (req, res) => {};

// Function to get user post history.
publicationController.userPostHistory = async (req, res) => {
    try{
        let apartments = await Apartment.find({ landlord: String(req.session.userID) }).sort({ date: -1});
        let rooms = await Room.find({ landlord: String(req.session.userID) }).sort({ date : -1});
        let studioApartments = await StudioApartment.find({ landlord: String(req.session.userID) }).sort({ date : -1});
    
        // debugging
        // console.log(apartments);
        // console.log(rooms);
        // console.log(studioApartments);
    
        // exit message
        res.status(200).json({
            msg:"user post history done",
            apartments: apartments,
            rooms:rooms,
            studioApartments:studioApartments
            });
        }
        catch{
            res.status(500).json({
                error:"Something bad happened..."
            });
        }
};

// Function to get all post.
publicationController.getPublications = async (req, res) => {
    try{
        let listing = await Listing.find().sort({ date: -1});
    
        // exit message
        res.status(200).json({
            msg:"Get publications done",
            listings: listing
            });
        }
        catch{
            res.status(500).json({
                error:"Something bad happened..."
            });
        }
};

module.exports = { publicationController };