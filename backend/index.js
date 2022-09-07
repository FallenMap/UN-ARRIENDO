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

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/testform.html'))
});

app.post('/send_form', function(req, res) {
    res.json(req.body);
    // Compile model from schema
    const Arrendador = require('./models/Arrendador');
    const ArrendadorModel = mongoose.model('Arrendador', Arrendador.schema);
    var NewArrendador = new ArrendadorModel(req.body);
    NewArrendador.save((err) => {
        if (err) return handleError(err);
        console.log('arrendador saved!');// saved!
    });
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});