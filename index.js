const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');

const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);



const port = process.env.PORT_NO;


app.listen(3000 ,()=>
    console.log('listening on port 🚀')
);



mongoose.connect('mongodb://localhost/moviesDB')
.then(()=> console.log('Connected to MongoDB 🔥'))