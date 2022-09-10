const Tenant = require('../models/tenant');
const Landlord = require('../models/landlord');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Create an object that save all controller functions.
const userController = {};

// Function to register a new user, we must validate the information given by the frontend.
userController.createUser = async (req, res) => {

    // Change the password given by frontend to the encrypted password
    req.body.password = await bcrypt.hash(req.body.password, 8);

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

userController.updateUser = (req, res) => {
    //Updating the user
    let user = await User.findOne({email:req.body.email}).exec();
    if(user){
        // User exists
        if(req.session.userRol == "landlord"){
            // update user landlord
        }else{
            // update user tenant
        }
    }else{
        // user doesn't exists
        res.status(404).json({
            error:"The user does not exist",
            data: user
        });
    }

    // exit message
    res.status(200).json({
        msg:"Update done"
    });
};

userController.loginUser = async (req, res) => {
    let user = await User.findOne({email:req.body.email}).exec();
    if(user){
        let exist = await bcrypt.compare(req.body.password, user.password);
        if(exist){
            req.session.userLogin = true;
            req.session.userID = user.id;
            req.session.userRol = user.role;
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

