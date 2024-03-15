const { matchedData } = require('express-validator');
const Comercio = require('../models/nosql/comercio');

const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
*/

const getItems = async (req, res) => {
    const data = await Comercio.find({})
    res.send(data)
}

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
*/

const createItem = async (req, res) => {
    const { body } = req
    //console.log(body)
    const data = awaitComercio.create(body)
    res.send(data)
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
        const deletedItem = await Comercio.findByIdAndDelete(id); // Buscar y eliminar el item de la base de datos
        if (!deletedItem) {
            // Si el item no se encuentra
            return handleHttpError(res, "ERROR_ITEM_NOT_FOUND", 404);
        }
        res.send(deletedItem); // Enviar el item eliminado como respuesta
    } catch (err) {
        // Manejar errores
        console.error(err);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
}

module.exports = { getItems, getItem, createItem, updateItem,deleteItem };

