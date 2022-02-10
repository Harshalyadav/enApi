const mongoose = require('mongoose');
const joi = require('joi');


const Rental =  mongoose.model('Rental', new mongoose.Schema({
      customer : {
          type : new mongoose.Schema({
             name : {
                 type : String,
                 maxlength : 255,
                 minlength : 4,
                 required : true,

                  },
              isGold : {
                 type : Boolean,
                 default : false,
                    },
              phone :{
                 type : Number,
                 minlength : 10,
                 maxlength : 255,
                 required : true,

                   },
            
        }),

        required : true
    },
    movie : {
      type : new mongoose.Schema({
          title : {
              type : String,
              maxlength : 255,
              minlength : 10,
              trim : true ,
              required : true
                },
          dailyRentalRate : {
              type : Number,
              minlength : 0,
              maxlength : 255,
              required : true

          }
      })
      ,
      required : true

        },

    dateOut : {
      type : Date,
      default : Date.now, 
      required :  true  
       },

    dateReturned : {
        type : Date,
        required : true
    },
    rentalFee : {
        type : Number,
        min : 0,
    }



}));


function rentalValidate(rental){

    const schema = {
        customer : joi.objectId().required(),
        movie : joi.objectId().required
    }
    return  joi.validate(schema,rental);
}


exports.Rental = Rental; 
exports.validate = rentalValidate;