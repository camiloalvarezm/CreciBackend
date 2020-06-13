require('./config/config');
const express = require('express');

const app = express();

//convertir el payload en JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion global de rutas
app.use(require('./routes/index'));


//Puerto de escucha

app.listen(process.env.PORT, ()=>{
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

