const joi = require('joi');
const mongoose = require('mongoose');

const {genreSchema} = require('./genre');


const Movie = mongoose.model('movie',new mongoose.Schema({
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
        maxlength : 255,
      }
    }
  )
 );

  function validateMovies(movie){
      const schema ={
          title : joi.string().min(10).max(255).     required(),
          genre : joi.objectId().required(),
          numberInStock : joi.number().min(0).max(255).required(),
          dailyRentalRate : joi.number().min(0).max(255).required()

      }

      return joi.validate(movie,schema);

  }

exports.Movie = Movie;
exports.validate = validateMovies;