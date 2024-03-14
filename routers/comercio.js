const { getItems, getItem, createItem } = require("../controllers/tracks")
const { validatorCreateItem } = require("../validators/tracks")
const customHeader = require("../middleware/customHeader")



const express = require('express');
const router = express.Router();
const comerciosController = require('../controllers/comercioController');

// Obtener la lista de comercios
router.get('/', comerciosController.obtenerComercios);

// Obtener un comercio por su CIF
router.get('/:cif', comerciosController.obtenerComercioPorCIF);

// Guardar un comercio
router.post('/', comerciosController.guardarComercio);

// Modificar un comercio a partir de su CIF
router.put('/:cif', comerciosController.modificarComercioPorCIF);

// Borrar un comercio a partir de su CIF
router.delete('/:cif', comerciosController.borrarComercioPorCIF);

module.exports = router;