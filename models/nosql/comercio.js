const mongoose = require('mongoose');

const comercioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  cif: { 
    type: String, 
    required: true,
    unique: true },
  direccion: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  telefono: { 
    type: String, 
    required: true 
  },
  idPagina: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model("comercio", comercioSchema)

/*
Se define un nuevo modelo de Mongoose, este tendra todos los campos que necesita nuestra base de datos de comercio. Este esquema especifica la 
estructura de los documentos que se guardarán en la colección de MongoDB asociada.

Este modelo luego se usara para realizar las operaciones CRUD sobre el.
*/