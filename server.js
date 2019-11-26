const express =  require("express")
const dotenv =  require('dotenv')
const db  =  require("./config/db")
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

//setup routes
app.use('/api/v1/books',books)



//setup cors 

app.use(cors())


console.log(process.env.PORT)

//setup middleware
app.use(errorHandler);


const PORT =  process.env.PORT || 5000;
app.listen(PORT ,()=>{
     console.log(`listening on PORT ${PORT}`)
})