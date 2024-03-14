const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

/*
  nombre: { type: String, required: true },
  cif: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  idPagina: { type: Number, required: true }
*/

const validatorCreateItem = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("idPagina").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
    
]
module.exports = { validatorCreateItem }
