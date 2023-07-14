const express = require('express');
const app = express();

// require cookie
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose');
const port = 8000;
// cookie
app.use(cookieParser());

// middleware
app.use(express.urlencoded());

// use express router
app.use('/',require('./routes'));

// setup view engin
app.set('view engine','ejs');
app.set('views','./views');

// reading static file
app.use(express.static('assets'));


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})