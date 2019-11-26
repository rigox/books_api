const Book =   require('../models/Book');
const asyncHandler =  require("../middleware/async");
const ErrorResponse  = require("../utils/ErrorResponse")

//@desc gets a single  book
//@route GET api/v1/bootcamps
//@access Private
exports.getBook  =  asyncHandler(async (req,res,next)=>{

    const book    =  await Book.findById(req.params.id)
    
    if(!book){
        return next(
             new ErrorResponse(`Bootcamp not found with the id of ${id}`,400)
        )
   }
    res.status(200).json({
           success:true,
           data:book
    })
});

//@desc Creates a   book
//@route POST api/v1/book
//@access Private
exports.createBook =  asyncHandler(async (req,res,next)=>{
     
   const book =  await Book.create(req.body)

   res.status(200).json({
        success:true,
        data:book
   })

});