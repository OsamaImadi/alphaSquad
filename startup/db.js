const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/alphaSquad', { useNewUrlParser: true, useUnifiedTopology: true  });
    mongoose.connection.once('open',()=>{
    }).on('error', (error)=>{
        console.log('Connection error', error);
    });
} 
