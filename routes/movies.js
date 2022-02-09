const express = require('express');
const mongoose = require('mongoose');


const Router= express.Router();


const { Movie ,validate} = require('../models/movie');
const { Genres} = require('../models/genre');


Router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('name');
    return res.send(movies);
});

Router.get('/')

module.exports = Router; 