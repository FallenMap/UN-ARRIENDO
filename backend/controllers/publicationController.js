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
    let type = req.body.type;
    delete req.body.type;

    if (type.toLowerCase() == "apartment") {
        publication = new Apartment({ ...req.body, landlord:req.session.userID });
    } else if (type.toLowerCase() == "room") {
        publication = new Room({ ...req.body, landlord:req.session.userID });
    }else if(type.toLowerCase() == "studioapartment"){
        publication = new StudioApartment({ ...req.body, landlord:req.session.userID });   
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
publicationController.updatePublication = async (req, res) => {};

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
        console.log(apartments);
        console.log(rooms);
        console.log(studioApartments);
    
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

module.exports = { publicationController };