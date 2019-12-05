const morgan = require("morgan");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const publicPath = path.resolve(__dirname + "/public");
const app = express();
var router = express.Router();

app.use(express.static(publicPath), router);

app.get('/', function (request, res) {
    res.sendFile(__dirname + '/index.html');
});

const mascotas = require('./routes/mascotas');
const usuarios = require('./routes/usuarios');
const perros = require('./routes/perros');
const gatos = require('./routes/gatos');
const comentarios = require('./routes/comentarios');
const foro = require('./routes/foro');

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

app.use('/mascotas',mascotas);

app.use('/usuarios',usuarios);
app.use('/perros',perros);
app.use('/gatos',gatos);
app.use('/comentarios',comentarios);
app.use('/foro',foro);

// app.use('/public/css', express.static(__dirname + '/css'));
// app.use('/public/js', express.static(__dirname + '/js'));
// app.use('/public/img', express.static(__dirname + '/img'));
// app.use(express.static('public'));

module.exports = app;