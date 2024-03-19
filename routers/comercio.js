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
