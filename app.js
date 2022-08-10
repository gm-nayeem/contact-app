const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const contactRouter = require('./routes/contactRoutes.js');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://localhost/userContact') 
.then(() => console.log("mongose connection successful"))
.catch(err => console.log(err));

app.use('/contacts', contactRouter);


app.get('/', (req, res)=> {
    res.json({
        message: "Welcome to home page"
    })
})


app.use((req, res, next) => {
    res.status(404).json({
        message: "resource not found!!!"
    })
})


module.exports = app;