const asyncHandler =  require("../middleware/async");
const ErrorResponse  = require("../utils/ErrorResponse")
const Profile =  require("../models/Profile")
const Book =  require('../models/Book')


//@desc Creates a user Profile
//@route POST /api/v1/profiles/
//@access private
exports.createProfile =  asyncHandler(async (req,res,next)=>{
      console.log(req.user)

      let props = {}

      props.user =  req.user.id

      const prof =  await Profile.create(props)
      res.status(200).json({
           success:true,
           data:prof
      })
});


//@route GET  /api/v1/profiles/:id
//@desc   gets a users profile by id
//@access public
exports.getProfile =  asyncHandler(async (req,res,next)=>{
        const profile = await Profile.find({user:req.params.id}).populate('user',['name','email'])

        if(!profile){
              res.status(200).json({success:false,msg:"profile could not be found"})
        }
       res.status(200).json({
            success:true,
            data : profile
       })
});

//@route GET  /api/v1/profiles/
//@desc   gets all users profile
//@access public
exports.getProfiles =  asyncHandler(async (req,res,next)=>{
    const profiles = await Profile.find({}).populate('user',['name','email','phone'])
    if(profiles.length <=0){
         res.status(400).json({msg:"There are currently no profiles in the database please create some"})
    }

    res.status(200).json({
           success:true,
           length:profiles.length,
           data:profiles
    })
});

//@route UPDATE  /api/v1/profiles/id
//@desc   updates the user profile by adding the books 
//@access private
exports.checkoutBook =  asyncHandler(async (req,res,next)=>{
          
    const books =   await Book.find({
             '_id':{$in:req.body.books},
             'status':true,
    })
    
    if(books.length <=0){
         res.status(400).json({
              success:false,
              msg:'one of the books is not avialable'
         })
    }

    
    const updatedProfile  =  await  Profile.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true
    })

    const updatedBooks = await  Book.updateMany({
         '_id':{$in:req.body.books}
    },{
        $set:{"status":false}
    })
   
    res.status(200).json({
         success:true,
         data: updatedProfile
    })
      
      
});



//function to test route
exports.test =  asyncHandler(async (req,res,next)=>{
   res.status(200).json({msg:"Test works"})
}); 