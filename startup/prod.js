const helmet = require('helmet');
const compression = require('compression');
const { append } = require('express/lib/response');

module.exports= function(app){

    app.use(helmet());
    app.use(compression());
}