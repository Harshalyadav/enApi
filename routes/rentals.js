const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const { Movie} = require('../models/movie');
const { Rental ,validate} = require('../models/rental');
const { Customer} = require('../models/customer');


Router.get('/',async(req,res)=>{
    const rental = await  Rental.find().sort('-dateOut');
    return res.send(rental);
});



Router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(!error)
    return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);

    if(!customer)
    return res.status(400).send(' customer with given id was not found');

    const movie = await Movie.findById(req.body.movieId);

    if(!movie)
    return res.status(400).send(' movie with given id was not found');

    if(movie.numberInStock ===0)
    return res.status(400).send('movie is not in stock');

    let rental = new Rental({
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone,

        },
        mvoie :{
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate,
        }
    });
    rental = await rental.save();
    movie.numberInStock--;

     movie.save();

     return res.send(rental);
});

module.exports = Router;