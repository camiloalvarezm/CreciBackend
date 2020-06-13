require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//convertir el payload en JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion global de rutas
app.use(require('./routes/index'));

//Conexion a la base de datos
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw new err
    console.log('Base de datos ONLINE')
});
//Puerto de escucha
app.listen(process.env.PORT, ()=>{
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
