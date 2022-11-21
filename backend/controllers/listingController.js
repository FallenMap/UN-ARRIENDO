// importing libraries
const Apartment = require('../models/apartment');
const Listing = require('../models/listing');
const Room = require('../models/room');
const StudioApartment = require('../models/studioApartment');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");
const geocoder = require('../helpers/geocodingHelper');

async function getLocation(address) {
    if (!address || address.length < 3) {
        console.log("The address string is too short. Enter at least three symbols");
        return;
    }

    address = address.trim() + ", Bogotá";

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.GEOCODER_API_KEY}&q=${encodeURIComponent(address)}&format=json`;
    let dataResult = await fetch(url);
    dataResult = await dataResult.json();

    //await geocoder.geocode(address);

    let location = {
        type: 'Point',
        coordinates: [dataResult[0].lon, dataResult[0].lat],
        formattedAddress: dataResult[0].display_name
    };

    return location;
}

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

    // Adding the location  of the listing
    req.body.location = await getLocation(req.body.address);

    // Limits
    // -74.20917701530674 4.508183089398315 -73.97403898269468 4.83571738439052

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
        //console.log(req.body);  
        for (let tenant in json) {
            if (json.hasOwnProperty(tenant) && tenant != -1) {
                ratings += parseInt(json[tenant], 10);
                length += 1;
            }
        }

        if (length < 1) {
            length = 1;
        }
        let mean = (ratings / length);

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

// Function to filter publications.
listingController.filterListing = async (req, res) => {
    try {
        let conditions = {};
        if (String(req.body.type) != "undefined") { conditions.type = req.body.type }
        if (String(req.body.price) != "undefined") { conditions.price = req.body.price }
        if (String(req.body.stratum) != "undefined") { conditions.stratum = req.body.stratum }
        if (String(req.body.petFriendly) != "undefined") { conditions.petFriendly = req.body.petFriendly }
        if (String(req.body.carParking) != "undefined") { conditions.carParking = req.body.carParking }

        console.log(conditions);

        let getListing = "funciona";
        if (JSON.stringify(conditions) == '{}') { getListing = await Listing.find().sort({ date: -1 }); }
        else { getListing = await Listing.find(conditions).sort({ date: -1 }); }

        res.status(200).json({
            msg: "Se han filtrado las publicaciones correctamente!",
            listings: getListing
        });

    } catch {
        return res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba filtrar"
        });
    }
};

// Function to search publications using query url parameters to the route /listing/search?param=value&param2=value2....
// most parameters use the same name as the schema attributes, only different (for now) are some range values for price, rooms, bathrooms and rating
// type, cleaningArea and kitchen should match the values in db (in english case sensitive, ?type=StudioApartment not ?type=Apartaestudio)
// specific type characteristics should only be sent with the corresponding type parameter, for example kitchen=Open should only be sent with type=Apartment to be valid
// title, description and neighborhood search uses regex to finde the provided string in those fields
// order should not matter

//type: StudioApartment, Apartment, Room
//title: text
//description: text
//neighborhood: text
//priceMin: int
//priceMax: int
//furnished: boolean
//stratum: 1, 2, 3, 4, 5, 6 (right now is exact match, may add range search)
//bathroomsMin: int
//bathroomsMax: int
//carParking: boolean
//petFriendly: boolean
//bicycleParking: boolean
//roomsMin: int
//roomsMax: int
//cleaningArea: Communal, Private
//kitchen:  Open, Closed
//ratingMin: float
//ratingMax: float

// can copy next lines into postman GET request Query Params Bulk Edit for testing 

//type:StudioApartment
//title:bug
//description:ó
//neighborhood:test
//priceMin:10000
//priceMax:40000
//furnished:true
//stratum:2
//bathroomsMin:1
//bathroomsMax:1
//carParking:true
//petFriendly:false
//bicycleParking:true
//roomsMin:1
//roomsMax:5
//cleaningArea:Communal
//kitchen:Open
//ratingMin:1.6
//ratingMax:4

listingController.searchListings = async (req, res) => {
    try {
        console.log(req.query);

        let filter = {};

        const attributes = new Set(Object.keys(Listing.schema.tree));

        //define a set with characteristics from the model depending of type, to change url query params into valid mongo query. ej: ?stratum=2 > { "characteristics.stratum" : 2 }
        let characteristicsSet;
        const ranges = new Set(['priceMin', 'priceMax', 'roomsMin', 'roomsMax', 'bathroomsMin', 'bathroomsMax', 'ratingMin', 'ratingMax']);


        switch (String(req.query.type)) {
            case "undefined": //not specifying type
                characteristicsSet = new Set(Object.keys(Listing.schema.tree.characteristics));
                break;
            case "StudioApartment":
                characteristicsSet = new Set(Object.keys(StudioApartment.schema.tree.characteristics));
                break;
            case "Apartment":
                characteristicsSet = new Set(Object.keys(Apartment.schema.tree.characteristics));
                break;
            case "Room":
                characteristicsSet = new Set(Object.keys(Room.schema.tree.characteristics));
                break;
            default:
                throw 'error generating characteristics set';
        }

        //console.log(characteristicsSet);

        for (const [param, value] of Object.entries(req.query)) {
            //console.log(param);
            if ((param === 'title') || (param === 'description') || (param === 'neighborhood')) {   // casi insensitive text search using regex for title, description and neighborhood fields
                filter[param] = { $regex: String(value), $options: 'i' };
            } else if (characteristicsSet.has(param)) {     // exact match for fields in the characteristics set, depending on listing type
                filter["characteristics." + param] = value;
            } else if (ranges.has(param)) {     // range match between min and max for fields price, rooms and (private) bathrooms
                switch (param) {
                    case 'priceMin':
                        if (filter.price === undefined) { filter.price = {} }
                        filter.price.$gte = parseInt(value);
                        break;
                    case 'priceMax':
                        if (filter.price === undefined) { filter.price = {} }
                        filter.price.$lte = parseInt(value);
                        break;
                    case 'roomsMin':
                        if (filter["characteristics.rooms"] === undefined) { filter["characteristics.rooms"] = {} }
                        filter["characteristics.rooms"].$gte = parseInt(value);
                        break;
                    case 'roomsMax':
                        if (filter["characteristics.rooms"] === undefined) { filter["characteristics.rooms"] = {} }
                        filter["characteristics.rooms"].$lte = parseInt(value);
                        break;
                    case 'bathroomsMin':
                        if (filter["characteristics.privateBathrooms"] === undefined) { filter["characteristics.privateBathrooms"] = {} }
                        filter["characteristics.privateBathrooms"].$gte = parseInt(value);
                        break;
                    case 'bathroomsMax':
                        if (filter["characteristics.privateBathrooms"] === undefined) { filter["characteristics.privateBathrooms"] = {} }
                        filter["characteristics.privateBathrooms"].$lte = parseInt(value);
                        break;
                    case 'ratingMin':
                        if (filter.rating === undefined) { filter.rating = {} }
                        filter.rating.$gte = parseFloat(value);
                        break;
                    case 'ratingMax':
                        if (filter.rating === undefined) { filter.rating = {} }
                        filter.rating.$lte = parseFloat(value);
                        break;
                    default:
                        break;
                }
            } else if (!attributes.has(param)) {        // skip this parameter if its not a attribute of the listing model
                //console.log(param+' missed');
                continue;
            } else {        // exact match for fields that are model attributes
                filter[param] = value;
            }
        }

        console.log(filter);

        let result = await Listing.find(filter).sort({ date: -1 });


        res.status(200).json({
            msg: "Se han filtrado las publicaciones correctamente!",
            count: result.length,
            listings: result
        });

    } catch {
        return res.status(500).json({
            error: "Algo malo ocurrió cuando intentaba filtrar"
        });
    }
};

module.exports = { listingController };
