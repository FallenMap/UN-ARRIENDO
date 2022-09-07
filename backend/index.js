const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection, uses URI on .env file
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public'));

//Import compiled model
const arrendador = require('./models/arrendador');

//Serves basic HTML form for testing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/testForm.html'))
});

//Receives POST request with data for one record
app.post('/send_form', function(req, res) {
    //req.body contains JSON with request info
    res.send(req.body);    
    //Creates instance of model
    var newArrendador = new arrendador(req.body);
    //Saves instance in DB
    newArrendador.save((err) => {
        if (err) return handleError(err);
        console.log('arrendador saved!');// saved!
    });
});

//Search showcase, 'Nombres' field is passed as an URL parameter
app.get('/search', function(req, res) {
    //Finds arrendadors by exact match in 'Nombres', returns list of JSON
    arrendador.find({ 'Nombres': req.query.Nombres}, (err, arrendadores) => {
        if (err) return handleError(err);
        //console.log(arrendadores);
        res.send(arrendadores);
    })
  });

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});