const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const {User} = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');
const c = require('config');
 
const Router = express.Router();

Router.post('/',async(req,res)=>{

    const { error } = Validates(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    let users = await  User.findOne({ email : req.body.email});

    if(!users)
    return res.status(400).send("Invalid user and password");

    const validPassword = await bcrypt.compare(req.body,users.password);
    if(!validPassword)
    return res.status(400).send("Invalid password or email");
    
    const token = jwt.sign(
        {_id : users._id},
        config.get('jwtPrivateKey')
           );

    return res.send(token);


});

async function Validates(req){
    const schema = joi.object({
        email : joi.string().email().min(5).max(255).required(),
        password : joi.string().min(4).max(225).required()

    });
    try {
        const value = await schema.validateAsync({req,schema});
    }
    catch(error){
          console.log('Invalid');
    }
} 


module.exports = Router;