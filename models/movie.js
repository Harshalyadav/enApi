const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose');

const { genreSchema } = require('./genre');




const movieSchema =  new mongoose.Schema({
  title : {
    type : String,
    required : true,
    minlength : 10,
    maxlength : 255,
    
    
  },
  genre : {
    type : genreSchema,
    required : true
  },
  numberInStock : {
    type: Number,
    required : true,
    minlength :0,
    maxlength : 255
  },
  dailyRentalRate : {
    type : Number,
    rquired : true,
    minlength : 0,
    maxlength : 5,
  }
}
)

const Movie = mongoose.model('movie',movieSchema);

  async function validateMovies(movie){
    try {

      const schema = Joi.object({
          title : Joi.string().min(1).max(255).     required(),
          genre : Joi.objectId().required(),
          numberInStock : Joi.number().min(0).max(255).required(),
          dailyRentalRate : Joi.number().min(0).max(5).required()
 
       })

     
     const value = await schema.validateAsync({movie ,schema});
}
catch (err) { 
  console.log(err.message)
  }

}

exports.Movie = Movie;
exports.validate = validateMovies;