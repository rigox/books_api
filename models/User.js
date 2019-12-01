const mongoose =  require("mongoose")
const bcrypt =  require('bcryptjs')
const jwt =   require("jsonwebtoken")
const Schema =  mongoose.Schema

const userSchema = new Schema({

 name:{
      type:String,
      required:[true,'please add your name']
 },
 email:{
      type:String,
      required:[true,'please add an email'],
     unique:true,
     match:[
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        'please add a valid email'   
     ]

    },
    phoneNumber:{
           type:String
    },
    role:{
         type:String,
         enum:['user','publisher'],
         default:'user'
    },
    password:{
         type:String,
         required:[true,'please add a  password'],
         minlength:6,
         select:false
    },
    createdAt:{
         type:Date,
         default: Date.now()
    }


});


//Encrypt password using bcrypts
userSchema.pre('save', async function(next){
   const  salt =  await bcrypt.genSalt(10)
   this.password =  await bcrypt.hash(this.password,salt)
});

//Sign JWT and return
userSchema.methods.getJWT =  function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn:process.env.JWT_EXPIRE 
    }); 
};

//Match passwords 
userSchema.methods.matchPasswords =  async function(enteredPassword){
  return bcrypt.compare(enteredPassword,this.password);
};


module.exports =  mongoose.model('users',userSchema)