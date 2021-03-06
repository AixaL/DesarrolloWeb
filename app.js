const morgan = require("morgan");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const publicPath = path.resolve(__dirname + "/public");
const app = express();
const router = express.Router();

const mascotas = require('./routes/mascotas');
const usuarios = require('./routes/usuarios');
// const perros = require('./routes/perros');
// const gatos = require('./routes/gatos');
const comentarios = require('./routes/comentarios');
const foro = require('./routes/foro');

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);
// app.use(app.router);
// routes.initialize(app);

app.use('/mascotas',mascotas);

app.use('/usuarios',usuarios);
// app.use('/comentarios',comentarios);
app.use('/foro',foro);

app.use('/public/css', express.static(__dirname + '/css'));
app.use('/public/js', express.static(__dirname + '/js'));
app.use('/public/img', express.static(__dirname + '/img'));
app.use('/public/img', express.static(__dirname + '/views'));
app.use(express.static('public'));

app.use(express.static(publicPath), router);

// http: //localhost:3001/
app.get('/adopta', function (request, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/adopta/registro', function (request, res) {
    res.sendFile(__dirname + '/public/views/registro.html');
});
app.get('/adopta/login', function (request, res) {
    res.sendFile(__dirname + '/public/views/login.html');
});
app.get('/adopta/perros', function (request, res) {
    res.sendFile(__dirname + '/public/views/perros.html');
});
app.get('/adopta/gatos', function (request, res) {
    res.sendFile(__dirname + '/public/views/formulario.html');
});
app.get('/adopta/registraMascota', function (request, res) {
    res.sendFile(__dirname + '/public/views/formulario.html');
});
app.get('/adopta/foro', function (request, res) {
    res.sendFile(__dirname + '/public/views/foro.html');
});
app.get('/adopta/mascota', function (request, res) {
    res.sendFile(__dirname + '/public/views/formulario.html');
});
app.get('/adopta/perfil', function (request, res) {
    res.sendFile(__dirname + '/public/views/formulario.html');
});


module.exports = app;
