const express = require('express');
const mongoose = require('mongoose');
const _ =require ('lodash');
const bcrypt = require('bcrypt');

const  {User ,validate} = require('../models/user');
const Router =express.Router();


Router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error)
    return res.statusMessage(400).send(error.details[0].message);

    let user = new User.findOne({email: req.body.email});
    if(user)
    return res.status(400).send("user already existe");

    user = new User(
        _.pick(req.body,['name','email','password'])
            );
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    
    await user.save();
    return res.send(_.pick(user,['name','email','_id']));
});

module.exports = Router;