const express = require("express")
const routes = express.Router()
const { getItems, getItem, createItem } = require("../controllers/comercioController")

routes.get("/", getItems)
routes.get("/:id", getItem)
routes.post('/', createItem);

module.exports = routes

