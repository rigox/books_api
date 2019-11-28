const express =  require("express")
const  router = express.Router()
const { 
 login,
 getMe,
 register
}  = require('../controllers/auth')

const { 
  protect
}   = require("../middleware/auth")

router
    .post('/register',register)
    .post('/login',login)

router
    .get('/me',protect,getMe)

module.exports = router;