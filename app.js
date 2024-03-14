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