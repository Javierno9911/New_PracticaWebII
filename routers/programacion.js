const express = require('express');
//Simulamos una base de datos con el archivo de cursos.js anterior
//const { programacion } = require ('../datos/cursos.js' ).infoCursos;

const { infoCursos } = require('../datos/cursos.js');

const programacion = infoCursos.programacion;

const routerProgramcion = express.Router();

routerProgramcion.use(express.json());


//POST
routerProgramcion.post('/', (req, res) => {
    const cursoNuevo = req.body;
    routerProgramcion.push(cursoNuevo);
    res.send(JSON.stringify(routerProgramcion));
});

//PUT
routerProgramcion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion .findIndex(curso => curso.id == id);
    if (indice >= 0) {
        programacion[indice] = cursoActualizado ;
    }
    res.send(JSON.stringify(programacion));
});

//PATCH
routerProgramcion.patch('/:id',(req, res) => {
    const infoActualizada = req.body;
    const id=req.params .id;
    const indice=programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
        const cursoAModificar = programacion [indice];
        Object.assign(cursoAModificar,infoActualizada);
    }
    res.send(JSON.stringify(programacion));
});

//DELETE
routerProgramcion.delete('/:id',(req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >=0) {
        programacion.splice(indice,1);
    }
    res.send(JSON.stringify(programacion));
});

routerProgramcion.get('/', (req, res) => {
    res.json(programacion);
});

routerProgramcion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const data1 = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if (req.query.ordenar === 'vistas') {
        res.send(JSON.stringify(data1.sort((a, b) => b.vistas - a.vistas)));
    } else {
        res.send(JSON.stringify(data1));
    }

    if(data1.length === 0) {
        return res.status(404).send("No se encontró" + lenguaje);
    }
    res.send(JSON.stringify(data1));
});
routerProgramcion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const cursosFiltrados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(cursosFiltrados.length === 0) {
        return res.status(404).send("No se encontraron cursos " + lenguaje + " de nivel " + nivel);
    }

    res.send(JSON.stringify(cursosFiltrados));
});

module.exports = routerProgramcion;