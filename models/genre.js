const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

async function validateGenre(genre) {
  
  try {

    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required()
  });
  
       const value = await schema.validateAsync({ movie, schema });
     }
   catch (err) { 
     
     value=>{console.log(value)};
  }
   
};

exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validateGenre = validateGenre;