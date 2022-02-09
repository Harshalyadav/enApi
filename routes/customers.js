const express = require('express');
const mongoose = require('mongoose');
const {Customer ,Validate } = require('../models/customer');


const joi = require('joi');

const Router = express.Router();

Router.get('/',async(req,res)=>{
    
    const customer = new Customer.find().sort('name');

    return res.send(customer);

});

Router.post('/', async(req,res)=>{
          
      const { error } = validateCustomer(req.body);
      
      if(!error)
      return res.status(400).send(error.details[0].message);

      const customer = new Customer(
          {
              name : req.body.name,
              phone : req.body.phone,
              isGold : req.body.isGold,
              password : req.body.password,
          }
          );

          customer = await customer.save();
          return res.send(customer);

});




module.exports = Router; 