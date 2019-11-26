const mongoose=  require("mongoose")
const Schema = mongoose.Schema
const uuid = require("uuid")

const  bookSchema = new Schema({

  title:{
        type:String,
        required:[true,'please add title to of the book']
  },
  Genre:{
       type:String,
       required:[true,'please add genre of the book']
  },
  Author:{
    type:String,
    required:[true,'please add Author of the book']
},
isbn:{
    type:String,
    required:[true,'please add genre of the book'],
    default:uuid
},
createdAt:{
       type:Date,
       default:  Date.now()
}

})


module.exports =  mongoose.model("books", bookSchema)