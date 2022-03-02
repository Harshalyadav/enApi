const mongoose = require('mongoose');
const joi = require('joi');

const User = mongoose.model('user', new mongoose.Schema({
     name : {
         type : String,
         minlength :5,
         maxlength :50,
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
     }

}));

async function userValidate(user){
    
    const schema ={
        name : joi.string().min(5).max(50).required(),
        email : joi.string().required().email(),
        password : joi.string().min(4).max(10).required()

    }; 
    
try {
    const value = await schema.validateAsync({ user , schema });
}
catch (err) { 
    console.log("Invalid");
 }
}

exports.User = User;
exports.validate = userValidate;