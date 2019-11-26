const express =  require("express")
const  router =  express.Router()
const   { 
 createBook ,
 getBook
}  = require("../controllers/books")

router
  .route('/')
  .post(createBook)

router
    .route('/:id')
    .get(getBook)

module.exports = router