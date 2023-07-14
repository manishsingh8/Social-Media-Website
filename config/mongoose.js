const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/User");

const db =  mongoose.connection;

db.on('error',console.error.bind("Error while connecting to Database"));

db.once('open',function(){
    console.log("Successfully connect to Database: Mongo")
})