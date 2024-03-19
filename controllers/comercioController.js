const Comercio = require('../models/nosql/comercio');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const fs = require("fs")

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../comercio"

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
*/

const getItems = async (req, res) => {
    try {
        const data = await Comercio.find({})
        res.send(data)
    }catch(err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
*/

const createItem = async (req, res) => {
    try {
        const { body, file } = req
        const fileData = { 
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        const data = await Comercio.create(fileData)
        res.send(data)
    }catch(err) {
        handleHttpError(res, "ERROR_DETAIL_ITEM")
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        const data = await Comercio.findById(id)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Actualizar un item en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
    try {
        const { id } = matchedData(req); // Obtener el ID del cuerpo de la solicitud
        const { body } = req; // Obtener los datos actualizados del cuerpo de la solicitud
        const updatedItem = await Comercio.findByIdAndUpdate(id, body, { new: true }); // Buscar y actualizar el item en la base de datos
        if (!updatedItem) {
            // Si el item no se encuentra
            return handleHttpError(res, "ERROR_ITEM_NOT_FOUND", 404);
        }
        res.send(updatedItem); // Enviar el item actualizado como respuesta
    } catch (err) {
        // Manejar errores
        console.error(err);
        handleHttpError(res, "ERROR_UPDATE_ITEM");
    }
}

/**
 * Eliminar un item de la base de datos
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req); // Obtener el ID del cuerpo de la solicitud
        const deletedItem = await Comercio.findById(id); // Buscar y eliminar el item de la base de datos
        await Comercio.deleteOne({_id:id})
        const filePath = MEDIA_PATH + "/" + deletedItem.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

