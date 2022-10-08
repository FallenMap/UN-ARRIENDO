module.exports = (req, res, next) => {
    if(req.session.userLogin){
        next();
    }else{
        res.status(401).json({
            error:"You are not logged in",
            isNotLogged: true
        });
    }
}