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

    req.body.comments = [];

    if (type.toLowerCase() == "apartment") {

        publication = new Apartment({ ...req.body });

    } else if (type.toLowerCase() == "room") {

        publication = new Room({ ...req.body });

    } else if (type.toLowerCase() == "studioapartment") {

        publication = new StudioApartment({ ...req.body });

    }

    if (publication) {
        await publication.save();
        res.status(200).json({
            msg: "Publicación creada.",
        });
    } else {
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
    delete req.body.comments;
    delete req.body.reviewedByTenants;
    if ((req.body.type).toLowerCase() == "apartment") {
        try {
            await Apartment.updateOne({ _id: req.body._id }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    } else if ((req.body.type).toLowerCase() == "room") {
        try {
            await Room.updateOne({ _id: req.body._id }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    } else if ((req.body.type).toLowerCase() == "studioapartment") {
        try {
            await StudioApartment.updateOne({ _id: req.body._id }, { $set: { ...req.body } });
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
        const query = await Listing.updateOne({ _id: ObjectId(req.params.listingID) }, { active: false });
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
        const query = await Listing.updateOne({ _id: ObjectId(req.body.listingID) }, { active: true });
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
listingController.ratingListing = async (req, res) => {
    try {
        let ratings = 0;
        let length = 0;
        let json = req.body.reviewedByTenants;
        // debugging
        //console.log(req.body.reviewedByTenants);  
        //console.log(req.body.publicationID); 
        //console.log(json);   
        for (let tenant in json) {
            if (json.hasOwnProperty(tenant) && tenant != -1) {
                ratings += parseInt(json[tenant], 10);
                length += 1;
            }
        }

        let mean = ratings / length;

        try {
            await Listing.updateOne({ _id: req.body._id }, { $set: { rating: mean, reviewedByTenants: req.body.reviewedByTenants } });
        } catch (error) {
            console.log(error);
        }

        res.status(200).json({
            msg: "Rating updated!",
            average: mean
        });
    }
    catch {
        res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba puntuar"
        });
    }
};

// Function to get user post history.
listingController.userListingHistory = async (req, res) => {
    try {
        let listings = await Listing.find({ landlord: String(req.session.userID) }).sort({ date: -1 });

        // exit message
        res.status(200).json({
            msg: "user post history done",
            listings

        });
    }
    catch {
        res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba acceder al historial..."
        });
    }
};

// Function to get all post.
listingController.getListings = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ date: -1 });

        // exit message
        res.status(200).json({
            msg: "Get publications done",
            listings: listing
        });
    }
    catch {
        res.status(500).json({
            error: "Something bad happened..."
        });
    }
};

listingController.getListing = async (req, res) => {
    try {
        // console.log(req.params.listingID)
        let getListing = await Listing.findOne({ _id: req.params.listingID });
        // exit message

        // moves the comment by current user (if it exists) to the front of the array, so that its easier to reach the edit and delete buttons in frontend, same logic could be moved to front ent
        let fromIndex = getListing.comments.findIndex(i => i.idUser == req.session.userID);
        if (fromIndex !== -1) {
            let currentUserComment = getListing.comments[fromIndex];
            getListing.comments.splice(fromIndex, 1);
            getListing.comments.splice(0, 0, currentUserComment);
        }

        res.status(200).json({
            msg: "Get listing Information done",
            listing: getListing
        });
    }
    catch {
        res.status(500).json({
            error: "Something bad happened..."
        });
    }
}


// Function to save a comment of a publication.
listingController.commentListing = async (req, res) => {
    let comment;
    try {
        // adds the current user id to the comment object
        req.body.comments.idUser = req.session.userID;
        // update the (commented) listing document if the document exists (theres a document with the commented listing id) and there's no comments by the current user (no entry on comments array with idUser equal to current user id)
        // push operation to not override other users comments
        // the commentListing method works with both non existant, existant but empty and existant and non empty comments array. some older listing documents do not have the empty array of the new createListing method
        await Listing.updateOne({ $and: [{ _id: ObjectId(req.body.idListing), comments: { $exists: false } }] }, { $set: { "comments": [] } });
        await Listing.updateOne({ $and: [{ _id: ObjectId(req.body.idListing) }, { "comments.idUser": { $ne: ObjectId(req.session.userID) } }] }, { $push: { comments: req.body.comments } });
        let listing = await Listing.findOne({ _id: ObjectId(req.body.idListing) });
        comment = listing.comments.pop();
        while (comment.idUser != req.session.userID && listing.comments.length > 0) {
            comment = listing.comments.pop();
        }
    } catch {
        return res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba comentar"
        });
    }
    res.status(200).json({
        msg: "Listing comment created!",
        comment: comment
    });
};

// Function to update a comment of a publication.
listingController.updateListingComment = async (req, res) => {
    try {
        // adds the current user id to the comments object
        req.body.comments.idUser = req.session.userID;
        // update the (commented) listing document, updating the comments made by the commenting user (comment.idUser == session.userID)
        // check existance of comments field, some older listing documents do not have the empty array of the new createListing method (this is only to avoid crashes)
        await Listing.updateOne({ $and: [{ _id: ObjectId(req.body.idListing) }, { comments: { $exists: true } }] }, { $set: { "comments.$[comment]": req.body.comments } }, { arrayFilters: [{ "comment.idUser": ObjectId(req.session.userID) }] });
    } catch {
        return res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba actualizar el comentario"
        });
    }
    res.status(200).json({
        msg: "¡Se ha actualizado correctamente tu comentario!"
    });
};

// Function to delete a comment of a publication.
listingController.deleteListingComment = async (req, res) => {
    try {
        // update the (commented) listing document, deleting the comment made by the commenting user (comment.idUser == session.userID)
        // check existance of comments field, some older listing documents do not have the empty array of the new createListing method (this is only to avoid crashes)
        await Listing.updateOne({ $and: [{ _id: ObjectId(req.body.idListing) }, { comments: { $exists: true } }] }, { $pull: { comments: { idUser: ObjectId(req.session.userID) } } });
    } catch {
        return res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba borrar el comentario"
        });
    }
    res.status(200).json({
        msg: "Listing comment deleted!"
    });
};

module.exports = { listingController };
