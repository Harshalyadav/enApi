const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
     name : {
         type : String,
         minlength :5,
         maxlength :50,
         trim : true,
         required : true
      },
     email :{
         type : String,
         required : true,
         unique : true
     },

     password : {
         type : String,
         required : true,
         minlength : 4,
         maxlength : 10,
     },
     isAdmin : Boolean

});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
  }

  const User = mongoose.model('User', userSchema);



async function userValidate(user){
    
  
    
    const schema =Joi.object({
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().required().email(),
        password : Joi.string().min(4).max(10).required()
        
    }); 
    
      const value =  schema.validate({ user,schema });
    //   return value;
}


exports.User = User;
exports.validate = userValidate;