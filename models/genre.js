const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
    name : {

        type : String,
        required : true,
        minlength : 5,
        maxlength : 50

    }
  }
 );

const Genres = mongoose.model('genre', genreSchema
  );



async function validateGenres(genre){

    const Schema = {
        name : joi.string().min(4).required()
    };
    return joi.validate(genre, Schema);
}

exports.Genres = Genres;
exports.genreSchema=genreSchema;
exports.validate = validateGenres;