const express = require('express');

const mongoose = require('mongoose');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const Router =  express.Router();
// const joi = require('joi');

const {Genre ,validateGenre} = require('../models/genre');


Router.get('/',async(req,res,next)=>{
    const genres = await Genre.find().sort('name');
     res.send(genres);
});

Router.get('/:id',async(req,res)=>{
    const genres = await Genre.findById(req.params.id);
    if(!genres)
    return res.status(404).send('The genre with the given id');

     res.send(genres);
});

Router.post('/new',auth,async(req,res)=>{

     const {error} = validateGenre(req.body);
     if(error)
     return res.status(400).send(error)
    

     let genre = new  Genre({
         name : req.body.name
        });

     genre = await genre.save();
     res.send(genre);
});

//Update name and

Router.put('/:id', async(req,res)=>{
      
      const {error} = validateGenre(req.body);
      if(error)
      return res.status(400).send(error);

      const genres = await Genre.findByIdAndUpdate(req.params.id,
        {
            name : req.body.name
        },{
            new : true
        });

      if(!genres)
      return res.status(404).send("The genre with given id");

      return res.send(genres);

});

Router.delete('/:id',[auth ,admin], async(req,res)=>{
    
    const genres = await Genre.findByIdAndRemove(req.params.id);

    if(!genres)
    return res.status(404).send("The genres with the given id ");
//dout
    const index = await Genre.indexOf(genres);
     genres.splice(index, 1);
     return res.send(genres);   
});

module.exports = Router;