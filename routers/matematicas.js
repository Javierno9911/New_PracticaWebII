const express = require('express');
//Simulamos una base de datos con el archivo de cursos.js anterior
//const { matematicas } = require ('../datos/cursos.js' ).infoCursos;

const { infoCursos } = require('../datos/cursos.js');

const matematicas = infoCursos.matematicas;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());

//POST
routerMatematicas.post('/', (req, res) => {
    const cursoNuevo = req.body;
    routerProgramcion.push(cursoNuevo);
    res.send(JSON.stringify(routerMatematicas));
});

//PUT
routerMatematicas.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = matematicas .findIndex(curso => curso.id == id);
    if (indice >= 0) {
        matematicas[indice] = cursoActualizado ;
    }
    res.send(JSON.stringify(matematicas));
});

//PATCH
routerMatematicas.patch('/:id',(req, res) => {
    const infoActualizada = req.body;
    const id=req.params .id;
    const indice=matematicas.findIndex(curso => curso.id == id);
    if (indice >= 0){
        const cursoAModificar = matematicas [indice];
        Object.assign(cursoAModificar,infoActualizada );
    }
    res.send(JSON.stringify(matematicas));
});

//DELETE
routerMatematicas.delete('/:id',(req, res) => {
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);
    if (indice >=0) {
        matematicas.splice(indice,1);
    }
    res.send(JSON.stringify(matematicas));
});


routerMatematicas.get('/', (req, res) => {
    res.json(matematicas);
});

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const data = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if(data.length === 0) {
        return res.status(404).send("No se encontró " + tema);
    }
    res.send(JSON.stringify(data,));
});

module.exports = routerMatematicas;