const winston = require('winston');
const mongoose = require('mongoose');

require('dotenv').config();

module.exports= function(){

    mongoose.connect(process.env.MONGODB_ACCESS_TOKEN_SECRET)
.then(()=> winston.info('Connected to MongoDB 🔥'))

}