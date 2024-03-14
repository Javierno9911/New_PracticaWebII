const { matchedData } = require('express-validator');
const Comercio = require('../models/comercio');
const { handleHttpError } = require('../utils/handleError');

// Obtener la lista de comercios
exports.obtenerComercios = async (req, res) => {
    try {
        const data = await Comercio.find({});
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);
    }
};

// Obtener un comercio por su CIF
exports.obtenerComercioPorCIF = async (req, res) => {
    try {
        const comercio = await Comercio.findOne({ cif: req.params.cif });
        if (!comercio) {
            return handleHttpError(res, 'ERROR_COMERCIO_NO_ENCONTRADO', 404);
        }
        res.send(comercio);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM', 403);
    }
};

// Guardar un comercio
exports.guardarComercio = async (req, res) => {
    try {
        const body = matchedData(req);
        const comercio = new Comercio(body);
        const resultado = await comercio.save();
        res.send(resultado);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS', 400);
    }
};

// Modificar un comercio a partir de su CIF
exports.modificarComercioPorCIF = async (req, res) => {
    try {
        const comercio = await Comercio.findOneAndUpdate({ cif: req.params.cif }, req.body, { new: true });
        if (!comercio) {
            return handleHttpError(res, 'ERROR_COMERCIO_NO_ENCONTRADO', 404);
        }
        res.send(comercio);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 400);
    }
};

// Borrar un comercio a partir de su CIF
exports.borrarComercioPorCIF = async (req, res) => {
    try {
        const { borradoLogico = true } = req.query;
        let resultado;
        if (borradoLogico) {
            resultado = await Comercio.findOneAndUpdate({ cif: req.params.cif }, { $set: { eliminado: true } }, { new: true });
        } else {
            resultado = await Comercio.findOneAndDelete({ cif: req.params.cif });
        }
        if (!resultado) {
            return handleHttpError(res, 'ERROR_COMERCIO_NO_ENCONTRADO', 404);
        }
        res.send(resultado);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 400);
    }
};