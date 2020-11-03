const express = require('express');
const home = require('../routes/home');
const user = require('../routes/user');
const auth = require('../routes/auth');

module.exports= function(app){
    app.use(express.json());
    app.use('/',home);
    app.use('/user',user);
    app.use('/auth',auth);
}