const express = require('express');
const mongoose = require('mongoose');
const _ = require ('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const  {User ,validate} = require('../models/user');
const Router =express.Router();


Router.post('/',async(req,res)=>{

    const {error} = validate(req.body);
    if(error)
    return res.statusMessage(400).send(error.details[0].message);

    const user = new User.findOne({email: req.body.email});
    if(user)
    return res.status(400).send("user already existe");
    
  
    user = new User(
        _.pick(req.body,['name','email','password'])
            );
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    
    await user.save();
    
    const token = jwt.sign({
        _id : user._id
    },
      config.get('jwtPrivateKey')
    );
    
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','password']));

});

module.exports = Router;