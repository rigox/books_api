const Book =   require('../models/Book');
const asyncHandler =  require("../middleware/async");
const ErrorResponse  = require("../utils/ErrorResponse")



//@desc gets  books or use a select statement
//@route GET api/v1/bootcamps/
//@access Public
exports.getBooks = asyncHandler(async (req,res,next)=>{

   const books = await Book.find({})

   res.status(200).json({
        success:true,
        length: books.length,
        data:books
   }) 
});

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
     console.log('Here', req.body)
   const book =  await Book.create(req.body)

   res.status(201).json({
        success:true,
        data:book
   })

});

//@desc updates  a book
//@route PUT api/v1/book
//@access Private
exports.updateBook  = asyncHandler(async (req,res,next)=>{

     const book = await Book.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true
        });

        if(!book){
             return new ErrorResponse(`Book with the id of ${req.params.id} not found`, 400)
        }
     
        res.status(200).json({
             success:true,
             data:book
        });
});


//@desc deletes  a book
//@route Delete api/v1/book
//@access Private
exports.deleteBook =  asyncHandler(async   (req,res,next)=>{
      
        const book =   await Book.findById(req.params.id)

        if(!book){
             return new ErrorResponse(`Book with the id of ${req.params.id} is not found`,400)
        }

        book.remove();
        res.status(200).json({
               success:book,
               data:book
        })
     
});