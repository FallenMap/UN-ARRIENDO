const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const FileStore = require('session-file-store')(session);
const fileStoreOptions={
  path: process.env.SESSION_PATH || './sessions',
};


require('dotenv').config();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure the morgan library to view requests.
app.use(morgan('tiny'));

//Configure the cors for request from frontend
app.use(cors({
  origin: "https://frontend-unarriendo.herokuapp.com",
  preflightContinue: false,
  methods: "GET, HEAD, PUT, PATH, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.set('trust proxy', 1);

//Initialize the session
app.use(session({
  store: new FileStore(fileStoreOptions),
  secret: process.env.SECRET, 
  saveUninitialized: true, 
  resave: false,
  unset: 'destroy',
  cookie: {
    secure: true,
    maxAge: 3600000,
    sameSite: 'Lax'
  }
}));

//Set up default mongoose connection, uses URI on .env file
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Configure the routes of the project
app.use('/user', require('./routes/userRoutes'));
app.use('/listing', require('./routes/listingRoutes'));
app.use('/images', require('./routes/imagesRoutes'));

//app.use(express.static('public'));


app.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});