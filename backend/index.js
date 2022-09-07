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

// importa modelo ya definido
const Arrendador = require('./models/Arrendador');

// form basica para pruebas
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/testform.html'))
});

//form manda POST request a /send_form
app.post('/send_form', function(req, res) {
    //req.body es JSON con info del form
    res.send(req.body);    
    // crea instancia del modelo utilizando el cuerpo del request
    var NewArrendador = new Arrendador(req.body);
    // guarda en DB
    NewArrendador.save((err) => {
        if (err) return handleError(err);
        console.log('arrendador saved!');// saved!
    });
});

// manejo de busqueda por nombre
app.get('/search', function(req, res) {
    // encuentra arrendadores por campo de Nombres, exacto
    Arrendador.find({ 'Nombres': req.query.Nombres}, (err, arrendadores) => {
        if (err) return handleError(err);
        //console.log(arrendadores);
        res.send(arrendadores);
    })
  });

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});