// importing libraries
const Apartment = require('../models/apartment');
const Listing = require('../models/listing');
const Room = require('../models/room');
const StudioApartment = require('../models/studioApartment');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Create an object that save all controller functions.
const listingController = {};

// Function to create a new publication.
listingController.createListing = async (req, res) => {

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
    let type = req.body.type;
    delete req.body.type;

    // Adding the user that created the listing:V
    req.body.landlord = req.session.userID;

    if (type.toLowerCase() == "apartment") {

        publication = new Apartment({ ...req.body});

    } else if (type.toLowerCase() == "room") {

        publication = new Room({ ...req.body});

    }else if(type.toLowerCase() == "studioapartment"){

        publication = new StudioApartment({ ...req.body});

    }

    if(publication){
        await publication.save();
        res.status(200).json({
            msg: "Publicación creada.",
        });
    }else{
        res.status(400).json({
            msg: "Este tipo de publicación no es reconocida.",
        });
    }
};

// Function to update a publication.
listingController.updateListing = async (req, res) => {
    // handle photos
    if (req.files) {
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
listingController.deleteListing = async (req, res) => {
        
    let found;
    //deleting, set to inactive
    try {
        const query = await Listing.updateOne({ _id: ObjectId(req.body.listingID) }, {active: false});
        found = query.matchedCount;
    } catch (error) {
        console.log(error);
    }
    
    if (found === 0) {
        res.status(404).json({
            msg: "Listing not found!"
        });
    } else {
        res.status(200).json({
            msg: "Listing deactivated!"
        });
    }
};

// Function to restore a publication.
listingController.restoreListing = async (req, res) => {
        
    let found;
    //restoring, set to active
    try {
        const query = await Listing.updateOne({ _id: ObjectId(req.body.listingID) }, {active: true});
        found = query.matchedCount;
    } catch (error) {
        console.log(error);
    }
    
    if (found === 0) {
        res.status(404).json({
            msg: "Listing not found!"
        });
    } else {
        res.status(200).json({
            msg: "Listing restored!"
        });
    }
};

// Function to save a rating of a publication.
listingController.ratingListing = async (req, res) => {};

// Function to get user post history.
listingController.userListingHistory = async (req, res) => {
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
                error:"Algo malo ocurrió cuando intentaba acceder al historial..."
            });
        }
};

// Function to get all post.
listingController.getPublications = async (req, res) => {
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

module.exports = { listingController };
