const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const {UserModel} = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');

 
const Router = express.Router();

Router.post('/',async(req,res)=>{

    const { error } = Validates(req.body);
    if(error)
    return res.status(400).send(error.message);

    let users = await  UserModel.findOne({ email : req.body.email});

    if(!users)
    return res.status(400).send("Invalid user and password");

    const validPassword = await bcrypt.compare(
        req.body.password,
        users.password);

    if(!validPassword)
    return res.status(400).send("Invalid password or email");
    
    const token = users.generateAuthToken();

    return res.send(token);


});

async function Validates(req){
    const schema = joi.object({
        email : joi.string().email().max(255).required(),
        password : joi.string().min(4).max(225).required()

    });
    
        const value = await schema.validate({req, schema});
   
} 


module.exports = Router;