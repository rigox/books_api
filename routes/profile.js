const express =  require("express")
const  router =  express.Router()

const { 
   protect
}  = require("../middleware/auth")

const { 
     createProfile,
     getProfile,
     getProfiles,
     checkoutBook,
      returnBooks
} =  require("../controllers/profiles")

router
   .route('/')
     .post(protect,createProfile)
     .get(getProfiles)

router
    .route("/:id")
        .get(getProfile)
        .put(protect,checkoutBook)

router.
     route('/return/:id')
        .put(returnBooks)

    
module.exports =  router;