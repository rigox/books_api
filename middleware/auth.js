const jwt =  require("jsonwebtoken");
const asyncHandler =  require('./async')
const  errorResponse =  require('../utils/ErrorResponse');
const User =  require('../models/User');

//Protect Routes
exports.protect =  asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token  = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new ErrorResponse('not authorize to access this route'));

    }
    try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next();
    } catch (err) {
        return next(new ErrorResponse('not authorize to access this route'));
    }
});