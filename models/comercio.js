const mongoose = require('mongoose');

const comercioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cif: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  idPagina: { type: Number, required: true }
});

const Comercio = mongoose.model('Comercio', comercioSchema);

module.exports = Comercio;