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
    check("email").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("idPagina").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
    
]

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
      return validateResults(req, res, next)
  }
]

module.exports = { validatorCreateItem, validatorGetItem }

/*
Se importar una función llamada validateResults desde un archivo handleValidator.js ubicado en la carpeta utils. Esta función se utiliza para manejar 
los resultados de la validación realizada en la solicitud.

Para cada conjunto de validaciones (validatorCreateItem y validatorGetItem), se definen una serie de reglas de validación utilizando check. Estas reglas 
especifican qué campos de la solicitud deben existir, y que requisitos tienen que tener. Con validaResult se maneja los resultados de la validacion.

*/
