const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({

user:{
     type:Schema.Types.ObjectId,
     ref:'users',
},
 books:[
     {
          type:Schema.Types.ObjectId,
          ref:'books'
     }
 ],
 amountDue:{
      type:Number,
      default:0
 },

createdAt:{
      type:Date,
      default:  Date.now()
}


});



module.exports = mongoose.model('profiles',profileSchema)