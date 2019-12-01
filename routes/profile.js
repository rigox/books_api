const express =  require("express")
const  router =  express.Router()

const { 
   protect
}  = require("../middleware/auth")

const { 
     createProfile,
     getProfile,
     getProfiles,
     checkoutBook
} =  require("../controllers/profiles")

router
   .route('/')
     .post(protect,createProfile)
     .get(getProfiles)

router
    .route("/:id")
        .get(getProfile)
        .put(protect,checkoutBook)


module.exports =  router;