const express = require ('express' );
const app = express ();
const { infoCursos } = require ('./datos/cursos.js' );
require ('dotenv' ).config ();
app.get('/', (req, res) => {
    res.send('Bienvenido a express')
});

const routerProgramcion = require('./routers/programacion.js');
app.use('/api/cursos/programacion',routerProgramcion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas',routerMatematicas);

const port = process .env.PORT || 3001;
app.listen (port, () => {
    console .log('Servidor iniciado en el puerto' , port);
});

/*
app.get('/api/cursos/programacion', (req, res) => {
    let data = infoCursos.programacion;
    if (req.query.ordenar === 'vistas') {
        // Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
        data = data.sort((a, b) => b.vistas - a.vistas);
    }
    // Enviamos la respuesta después de ordenar (o sin ordenar si no se especifica)
    res.send(JSON.stringify(data));
});

app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if (data.length === 0) {
        return res.status(404).send("No se encontró " + lenguaje);
    }
    res.send(JSON.stringify(data));
});

app.get('/api/cursos/matematicas', (req, res) => {
    res.json(infoCursos.matematicas);
});*/



