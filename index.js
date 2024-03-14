const express = require ('express' );
const app = express ();
require ('dotenv' ).config ();

app.get('/', (req, res) => {
    res.send('Bienvenido a express')
});

const port = process .env.PORT || 3001;
app.listen (port, () => {
    console .log('Servidor iniciado en el puerto' , port);
});


