const express = require('express');
const mongoose = require('mongoose');


const Router= express.Router();


const { Movie ,validate} = require('../models/movie');
const { Genres} = require('../models/genre');


Router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('name');
    return res.send(movies);
});

Router.get('/:id',async(req,res)=>{
    const movies = await Movie.findById(req.params.id);

    if(!movies)
    return res.status(404).send("The movies with the given id was not found");

    return res(movies);
});

Router.post('/', async(req,res)=>{
    const {error} = validate(req.body);

    if(!error)
    return res.status(400).send(error.details[0].message);
       
     
   const genre = await Genres.findById(req.body.genreId);

   if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save();

    return res.send(movie);

});

Router.put('/:id', async(req,res)=>{
    const {error} = validate(req.body);

    if(!error)
    return res.status(400).send(error.details[0].message);

    const genre = await Genres.findById(req.body.genreId);
    
});

Router.delete('/:id' , async(req,res)=>{
     const movie = await Movie.findByIdAndDelete(req.params.id);

     if(!movie)
     return res.status(404).send('The movie with this id was not found');

     return res.send(movie);

     

});

module.exports = Router; 