const express =  require("express")
const dotenv =  require('dotenv')
const db  =  require("./config/db")
const cookies =  require("cookie-parser")

const colors   =  require("colors")
const cors = require("cors")
const errorHandler = require("./middleware/error")
const app =  express()

//Load enviromental variables
dotenv.config({path:'./config/config.env'})

//setup DB connection
db()

//setup bodyparser 
app.use(express.json(), express.urlencoded({extended:true}))

//load routes  
const books =  require('./routes/books')
const auth =  require('./routes/auth')
//setup routes
app.use('/api/v1/books',books)
app.use('/api/v1/auth',auth)


//setup cors 

app.use(cors())
app.use(cookies())


console.log(process.env.PORT)

//setup middleware
app.use(errorHandler);


const PORT =  process.env.PORT || 5000;
app.listen(PORT ,()=>{
     console.log(`listening on PORT ${PORT}`)
})