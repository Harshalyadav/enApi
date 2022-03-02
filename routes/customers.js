const express = require('express');
const mongoose = require('mongoose');
const {Customer ,Validate } = require('../models/customer');


const joi = require('joi');

const Router = express.Router();

Router.get('/',async(req,res)=>{
    
    const customer = await Customer.find().sort('name');

    return res.send(customer);

});

Router.post('/', async(req,res)=>{
          
      const { error } = Validate(req.body);
      
      if(error)
      return res.status(400).send(error);

      let customer = new Customer(
          {
              name : req.body.name,
              phone : req.body.phone,
              isGold : req.body.isGold,
              password : req.body.password,
          }
          );

           await customer.save();
          return res.send(customer);

});




module.exports = Router; 