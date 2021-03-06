const mongoose = require('mongoose');

const express = require('express');

const app = express();

const morgan= require('morgan');
const startDebugger = require('debug')('app : startup');


require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging');
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startDebugger('Morgen Enable....');
};

require('dotenv').config();


app.use(function(err,req,res,next){
    res.status(500).send('something failed');
})

const port = process.env.PORT || 8080;


app.listen(port,()=>
console.log(`listening on port 🚀  ${port}`)
);
