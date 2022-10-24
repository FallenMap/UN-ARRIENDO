const Tenant = require('../models/tenant');
const Landlord = require('../models/landlord');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const Listing = require('../models/listing');

const doNotSendThisData = ['password'];

// Create an object that save all controller functions.
const userController = {};

// Function to register a new user, we must validate the information given by the frontend.
userController.createUser = async (req, res) => {
    
    try {
        // Change the password given by frontend to the encrypted password
        req.body.password = await bcrypt.hash(req.body.password, 8);

        // Adds the uploaded photo filename (inside /public/userPhotos/) to request body before saving on DB (if it exists)
        if (!req.file) {
            req.body.photo = '';
        } else {
            req.body.photo = path.win32.basename(req.file.path);
        }

        let user;

        // Verify the user type and use the respective schema
        //console.log(...req.body);

        req.body.reviews = [];

        if(req.body.socialMediaHandles){
            req.body.socialMediaHandles = JSON.parse(req.body.socialMediaHandles);
        }
        
        if ((req.body.role).toLowerCase() == "landlord") {
            user = new Landlord({ ...req.body });
            await user.save();
        } else if (req.body.role == "tenant") {
            user = new Tenant({ ...req.body });
            await user.save();
        }

        const data = {};

        for (let i in user.toJSON()) {
            if (doNotSendThisData.indexOf(i) == -1) {
                data[i] = user.toJSON()[i];
            }
        }

        req.session.userLogin = true;
        req.session.userID = user._id;
        req.session.userRole = user.type;


        res.status(200).json({
            msg: "User created",
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ////////////////////////////////////////////////////////////////////////////////////////
            error: "Error de creacion"
        });
    }

};

userController.updateUser = async (req, res) => {

    if (req.file) {
        req.body.photo = path.win32.basename(req.file.path);
        fs.unlink(path.join(__dirname, '../public/userPhotos/', current.photo), (err) => {
            if (err) {
                console.error(err)
                return
            }
            //file removed
        })
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    if ((req.session.userRole).toLowerCase() == "landlord") {
        try {
            await Landlord.updateOne({ _id: req.session.userID }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    } else if ((req.session.userRole).toLowerCase() == "tenant") {
        try {
            await Tenant.updateOne({ _id: req.session.userID }, { $set: { ...req.body } });
        } catch (error) {
            console.log(error);
        }
    }

    res.status(200).json({
        msg: "Updated!"
    });
};


// Function to log in a user and return the data to the frontend
userController.loginUser = async (req, res) => {
    let user, query, data;
    //Prints the data sent by the user on the console.
    //console.log("---------------\nloginUserFunctionBodyRequest\n"+JSON.stringify(req.body)+"\n---------------");
    const error = validationResult(req);
    if (!error.isEmpty()) {
        query = {
            user: req.body.user
        }
    } else {
        query = {
            email: req.body.user
        }
    }

    if (req.session.userID) {
        return res.status(406).json({
            error: "You are already logged in"
        });
    }


    try {
        user = await User.findOne(query);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong while trying to connect to the database"
        });
    }

    if (user) {
        let match;
        try {
            match = await bcrypt.compare(req.body.password, user.password);
        } catch {
            return res.status(500).json({
                error: "Something bad happened..."
            });
        }

        if (match) {
            req.session.userLogin = true;
            req.session.userID = user._id;
            req.session.userRole = user.type;
            data = {};
            for (let i in user.toJSON()) {
                if (doNotSendThisData.indexOf(i) == -1) {
                    data[i] = user.toJSON()[i];
                }
            }
            return res.status(200).json({
                msg: "You are logged in",
                data: data
            });
        } else {
            return res.status(404).json({
                error: "Incorrect credentials",
            });
        }
    } else {
        return res.status(404).json({
            error: "The user does not exist"
        });
    }
}

userController.logoutUser = (req, res) => {
    if (req.session.userLogin) {
        req.session.destroy();
        res.status(200).json({
            msg: "Closed session"
        });
    } else {
        res.status(400).json({
            error: "There is no open session"
        });
    }
}

userController.getUser = async (req, res) => {
    try{
        //console.log(req.params.userPubID)
        let userPublication = await User.findOne({ _id: req.params.userPubID});
        // exit message
        res.status(200).json({
            msg:"Get user Information done",
            user: userPublication
            });
    }
    catch{
        res.status(500).json({
            error:"Something bad happened..."
        });
    }
}
// Function to save a review of a user.
userController.reviewUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.body._id }, { $set: {reviews: req.body.reviews } });
    } catch{
        res.status(500).json({
            error:"Algo malo ocurrió cuando intentaba reseñar"
        });
    }
    res.status(200).json({
        msg: "user review updated!"
    });
};

userController.getUserProfile = async(req, res) => {
    let data, listings, profile;
    try{
        data = await User.findById(req.params.id);
        if(data.type=="Landlord"){
            listings = await Listing.find({ landlord: String(req.params.id) }).sort({ date: -1}).limit(3);
            profile = {...(data._doc), listings: [...listings]}
        }else{
            profile= {...(data._doc)}
        }
    }catch{
        console.log("Something happends when the user load a profile");
        res.status(500).json({
            error:"No se pudo cargar el perfil del usuario"
        });
    }
    console.log(profile);
    res.status(200).json({
            msg:"Perfil recuperado exitosamente",
            profile: profile
    });


}

module.exports = { userController };

