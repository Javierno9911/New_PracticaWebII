const express = require("express")
const router = express.Router()
const customHeader = require("../middleware/customHeader")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/comercioController")
const { validatorCreateItem, validatorGetItem } = require("../validators/comercio")


router.get("/", getItems)

router.get("/:id", validatorGetItem, getItem)

router.put("/:id",validatorGetItem, validatorCreateItem, updateItem)

router.delete("/:id", validatorGetItem, deleteItem)

router.post("/", validatorCreateItem, customHeader, createItem)


module.exports = router

/*
Se importan modulos de express con los que crearemos un enrutador para manejar las rutas de comercio. Despues importmaos los validadores y las funciones
que se usaran para cada peticion.

Despues en cada router se usan cada funcion que estan definidas antes en el controlador (getItem, getItems, updateItem, deleteItem, createItem). 

Despues exportamos estas rutas.

*/