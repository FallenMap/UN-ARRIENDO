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

//Set up default mongoose connection
const mongoDB = 'mongodb+srv://developer:password@cluster0.ogaq1.mongodb.net/UN-ARRIENDO?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public'));

// importa schema definido en carpeta models
const Arrendador = require('./models/Arrendador');
// usa schema importado para compilar modelo, conecta con collecion (tabla) 'Arrendador' (se ve como 'arrendadors' en la DB)
const ArrendadorModel = mongoose.model('Arrendador', Arrendador.schema);


// form basica para pruebas
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/testform.html'))
});

//form manda POST request a /send_form
app.post('/send_form', function(req, res) {
    //req.body es JSON con info del form
    res.send(req.body);    
    // crea instancia del modelo utilizando el cuerpo del request
    var NewArrendador = new ArrendadorModel(req.body);
    // guarda en DB
    NewArrendador.save((err) => {
        if (err) return handleError(err);
        console.log('arrendador saved!');// saved!
    });
});

// manejo de busqueda por nombre
app.get('/search', function(req, res) {
    // encuentra arrendadores por campo de Nombres, exacto
    ArrendadorModel.find({ 'Nombres': req.query.Nombres}, (err, arrendadores) => {
        if (err) return handleError(err);
        console.log(arrendadores);
        res.send(arrendadores);
    })
  });

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});