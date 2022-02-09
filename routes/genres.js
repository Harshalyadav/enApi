const express = require('express');

const mongoose = require('mongoose');

const Router =  express.Router();
// const joi = require('joi');

const {Genres ,Validate} = require('../models/genre');


Router.get('/',async(req,res)=>{
    const genres = await Genres.find().sort('name');
    return res.send(genres);
});

Router.get('/:id',async(req,res)=>{
    const genres = await Genres.findById(req.params.id);
    if(!genres)
    return res.status(404).send('The genre with the given id');

    return res.send(genres);
});

Router.post('/',async(req,res)=>{
     const {error} = validateGenres(req.body);
     if(error)
     return res.status(400).send(error.details[0].message)

     let genre = new Genres({
         name : req.body.name
        });
    const result = await genre.save();
    return res.send(result);
});

//Update name and

Router.put('/:id', async(req,res)=>{
      
      const {error} = validateGenres(req.body);
      if(error)
      return res.status(400).send(error.details[0].message);

      const genres = await Genres.findByIdAndUpdate(id);

      if(!genres)
      return res.status(404).send("The genre with given id");

      return res.send(genres);

});

Router.delete('/:id', async(req,res)=>{
    
    const genres = await Genres.findByIdAndRemove(id);

    if(!genres)
    return res.status(404).send("The genres with the given id ");
//dout
    const index = await Genres.indexOf(genres);
     genres.splice(index, 1);
     return res.send(genres);   
});

module.exports = Router;