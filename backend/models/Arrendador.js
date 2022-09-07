const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define a schema
const ArrendadorSchema = new Schema({
    Nombres: String,
    Apellidos: String,
    Correo: String,
    Usuario: String,
    Contrasena: String,
    Whatsapp: String,
    Telegram: String,
    Facebook: String,
    FechaDeNacimiento: Date,
    HorarioDeAtencion: String,
    Descripcion: String
    //Foto: String //path del archivo subido
});

module.exports = mongoose.model('Arrendador', ArrendadorSchema);

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose