const express = require('express');
const app = express();

const { infoCursos } = require('./cursos.js');
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/cursos/programacion', (req, res) => {
    res.json(infoCursos.programacion);
    if (req.query.ordenar === 'vistas') {
        //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas )));
    } else {
        res.send(JSON.stringify(data));
    }
});
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if(data.length === 0) {
        return res.status(404).send("No se encontro" + lenguaje);
    }
    res.send(JSON.stringify(data));
});
app.get('/api/cursos/matematicas', (req, res) => {
    res.json(infoCursos.matematicas);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto', port);
});