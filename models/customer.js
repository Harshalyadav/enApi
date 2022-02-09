const mongoose = require('mongoose');
const joi = require('joi');


const Customer = mongoose.model('customer', new mongoose.Schema({
    name : {
         type : String,
         required : true,
         minlength :5,
         maxlength : 50
    },
    isGold :{
        type : Boolean,
        default : false
    },
    phone : {
        type : String,
        required : true ,
        minlength : 5,
        maxlength : 10
    },
    password : {
        type : String,
        lowercase : true,
        uppercase : true,
    }
}));


function validateCustomer(customer){
    
    const schema = {
        name : joi.string.min(4).max(50).required(),
        phone : joi.string().min(10).max(14).required(),
        isGold : joi.boolean(),
        password : joi.string.min(6).max(10).required()
    }

    return joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.Validate = validateCustomer;