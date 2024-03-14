const express = require ('express' );
const app = express ();
require ('dotenv' ).config ();

app.get('/', (req, res) => {
    res.send('Bienvenido a express')
});

const comercioRouter = require('./routers/comercio');
app.use('/api/comercios', comercioRouter);

const port = process .env.PORT || 3000;
app.listen (port, () => {
    console .log('Servidor iniciado en el puerto' , port);
});
