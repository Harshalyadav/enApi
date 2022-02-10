const mongoose = require('mongoose');
const config = require('config');

const express = require('express');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');


const app = express();

require('dotenv').config();

// console.log(process.env);

if(!config.get('jwtPrivateKey')){
   console.error('FATAL ERROR : //jwtPrivateKey is not define.');
   process.exit(1);
}


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/routes/users',users);
app.use('/api/auth',auth);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);

const port = process.env.PORT_NO;


app.listen(3000 ,()=>
    console.log('listening on port 🚀')
);



mongoose.connect('mongodb://localhost/moviesDB')
.then(()=> console.log('Connected to MongoDB 🔥'))