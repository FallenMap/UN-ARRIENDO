const Tenant = require('../models/tenant');
const Landlord = require('../models/landlord');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Create an object that save all controller functions.
const userController = {};

// Function to register a new user, we must validate the information given by the frontend.
userController.createUser = async (req, res) => {
    
    // Change the password given by frontend to the encrypted password
    req.body.password = await bcrypt.hash(req.body.password, 8);

    // Adds the uploaded photo filename (inside /public/userPhotos/) to request body before saving on DB (if it exists)
    if (!req.file) {
        req.body.photo = '';
    }else{        
        req.body.photo = path.win32.basename(req.file.path);
    }

    // Verify the user type and use the respective schema
    if(req.body.role=="landlord"){
        const landlordDetail = new Landlord(req.body);
        await landlordDetail.save();
    }else if(req.body.role=="tenant"){
        const tenantDetail = new Tenant(req.body);
        await tenantDetail.save();
    }    
    res.status(200).json({
        msg:"User created"
    });
};

userController.updateUser = async (req, res) => {
    //Updating the user
    if(req.session.userRol == "Landlord"){
        try{            
            // if new photo, add new filename to request body and deletes previous one
            const current = await User.findOne({_id:req.session.userID});
            if (!req.file) {
                req.body.photo = current.photo;
            }else{        
                req.body.photo = path.win32.basename(req.file.path);
                fs.unlink(path.join(__dirname, '../public/userPhotos/', current.photo), (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }                  
                    //file removed
                  })
            }
            
            // update user landlord
            req.body.password = await bcrypt.hash(req.body.password, 8);
            await Landlord.updateOne({_id:req.session.userID}, {
                firstName:              req.body.firstName,
                lastName:               req.body.lastName,
                email:                  req.body.email,
                user:                   req.body.user,
                gender:                 req.body.gender,
                password:               req.body.password,
                birthDate:              req.body.birthDate,
                description:            req.body.description,
                socialMediaHandles:     req.body.socialMediaHandles,
                businessHours:          req.body.businessHours,
                photo:                  req.body.photo});
        // exit message
        res.status(200).json({
        msg:"Update landlord done"
        });
        } catch{
            res.status(404).json({
                error:"user or email already in use landlord",
            });
        }
    }else{
        try{
            // if new photo, add new filename to request body and deletes previous one
            const current = await User.findOne({_id:req.session.userID});
            if (!req.file) {
                req.body.photo = current.photo;
            }else{        
                req.body.photo = path.win32.basename(req.file.path);
                fs.unlink(path.join(__dirname, '../public/userPhotos/', current.photo), (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }                  
                    //file removed
                  })
            }
            // update user tenant
            req.body.password = await bcrypt.hash(req.body.password, 8);
            await Tenant.updateOne({_id:req.session.userID}, {
                firstName:              req.body.firstName,
                lastName:               req.body.lastName,
                email:                  req.body.email,
                user:                   req.body.user,
                gender:                 req.body.gender,
                password:               req.body.password,
                birthDate:              req.body.birthDate,
                description:            req.body.description,
                degree:                 req.body.degree,
                cityBirth:              req.body.cityBirth,
                photo:                  req.body.photo});
        // exit message
        res.status(200).json({
        msg:"Update tenant done"
        });
        } catch{
            res.status(404).json({
                error:"user or email already in use tenant",
            });
        }
    }
};

userController.loginUser = async (req, res) => {
    let user = await User.findOne({email:req.body.email}).exec();
    if(user){
        let exist = await bcrypt.compare(req.body.password, user.password);
        if(exist){
            req.session.userLogin = true;
            req.session.userID = user._id;
            req.session.userRol = user.type;
            res.status(200).json({
                msg:"You are logged in",
                data: user
            });
        }else{
            res.status(404).json({
                error:"Incorrect credentials",
                data: user
            });
        }
    }else{
        res.status(404).json({
            error:"The user does not exist",
            data: user
        });
    }
}

userController.logoutUser = (req, res) => {
    if(req.session.userLogin){
        req.session.destroy();
        res.status(200).json({
            msg:"Closed session"
        });
    }else{
        res.status(400).json({
            error:"There is no open session"
        });
    }
}

module.exports = {userController};

