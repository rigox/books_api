const errorResponse = require('../utils/ErrorResponse');
const asyncHandler =  require("../middleware/async");
const  User =  require('../models/User');


//@desc  Register user
//@route post /api/auth/register
//@Access Public
exports.register =  asyncHandler(async (req ,res,next)=>{
    const {name,email,password,role} =  req.body
     
    //create user

    const user =   await  User.create({
          name,
          email,
          password,
          role
          
    });

    const token = user.getJWT();

    res.status(200).json({
         success:true,
         token
    })

});

//@desc  Login user
//@route post /api/auth/login
//@Access Public
exports.login =  asyncHandler(async (req,res,next)=>{
     const {email,password} =  req.body;

    //validate  password and email
    if(!email || !password){
           return next(new errorResponse('please provide a  email and password'))
    }

    const user =   await User.findOne({email:email}).select('+password')

    if(!user){
         return next(new errorResponse('Invalid credentials'),401)
    }

    // check if passwords match
    const isMatch =  await user.matchPasswords(password)

    if(!isMatch){
        return next(new errorResponse('Invalid credentials'),401)
    }

    sendTokenResponse(user,200,res); 

});

//helper function to send a cookie to the browser
const sendTokenResponse =  (user,statusCode,res)=>{
     const  token =  user.getJWT();
     const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 *60 *60*1000),
        httpOnly:true
    } 
    if(process.env.NODE_ENV === 'production'){
        options.secure =  true
   } res.status(statusCode)
   .cookie('token',token,options)
   .json({
        success:true,
        token
   })

}

//@desc get current login user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe =  asyncHandler(async (req,res,next)=>{
     const  user =  await User.findById(req.user.id)
     res.status(200).json({
          success:true,
          data:user
     })
});