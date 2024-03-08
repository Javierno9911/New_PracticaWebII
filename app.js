/*const { saludarEnEspanol, saludarEnIngles } = require("./saludo");
const http = require('http');

const servidor = http.createServer((req, res) => {
    // Verificamos la ruta solicitada para determinar el idioma del saludo
    if (req.url === '/es') {
        res.end(saludarEnEspanol()); // Saludo en español
    } else if (req.url === '/en') {
        res.end(saludarEnIngles()); // Saludo en inglés
    } else {
        res.statusCode = 404;
        res.end('Página no encontrada'); // Respuesta para rutas desconocidas
    }
});

const puerto = 3000;
servidor.listen(puerto, () => {
    console.log(`Servidor en ejecución en el puerto ${puerto}`);
});*/

const http = require('http');
const cursos = require('./cursos');

const servidor = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            return manejarSolicitudesGET(req, res);
        case 'POST':
            return manejarSolicitudesPOST(req, res)
        default:
            res.statusCode = 404;
            return res.end('Not Found');
    }
});

function manejarSolicitudesGET(req, res) {
    const path = req.url;
    if (path === '/') {
        res.statusCode = 200;
        return res.end('Hola mundo!!!');
    } else if (path === '/cursos') {
        res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos));
    } else {
        res.statusCode = 404;
        return res.end('Ruta no encontrada');
    }
}
function manejarSolicitudesPOST(req, res) {
    if (req.url === "/cursos/programacion") {
        let body = "";
        req.on('data', (content) => {
            body += content.toString();
        });
        req.on('end', () => {
            body = JSON.parse(body);
            // Aquí puedes hacer algo con los datos recibidos
            console.log("Datos recibidos:", body);
            res.statusCode = 200;
            return res.end("Procesamiento POST finalizado");
        });
    } else {
        res.statusCode = 404;
        return res.end("Ruta no encontrada");
    }
}
const port = 3000;
servidor.listen(port, () => {});