const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message)
}
module.exports = { handleHttpError }

/*
Esta funcion se utiliza para enviar repsuestas de error.

Se establece el código de estado HTTP utilizando res.status(code).

Se envía el mensaje de error utilizando res.send(message).

*/