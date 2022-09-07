const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    //Define a schema
    schema : new Schema({
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
    })
};

// // Create an instance of model
// const TestArrendador = new ArrendadorModel({
//     Nombres: 'Juan',
//     Apellidos: 'Perez',
//     Correo: 'jperez@unal.edu.co',
//     Usuario: 'jperez',
//     Contrasena: 'password',
//     Whatsapp: '3211234567',
//     Telegram: 'no se como son contactos en telegram',
//     Facebook: 'jperez',
//     FechaDeNacimiento: Date.now(),
//     HorarioDeAtencion: 'definir que estructura usar para este dato',
//     Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//     //Foto: 'WIP' //path del archivo subido
//   });

// // Save the new model instance, passing a callback
// TestArrendador.save((err) => {
// if (err) return handleError(err);
// console.log('document saved!');// saved!
// });
