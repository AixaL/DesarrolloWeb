const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');
const middleware = require('./../middleware/token');

router.get('/', function (request, res) {
    // el método es sendFile (con F mayúscula) y debes agregar
    // la variable de entorno llamada __dirname que te da la ruta de 
    // de la raíz en tu actual proyecto
    res.sendFile(__dirname + '/index.html');
});

router.get("/ver", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM mascotas;";
    db.query(query, (err, result, fields) =>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        console.log(result);
        res.status(200);
        res.json({code: 1, message: result});
        db.end((err) => {console.log("closed")});
    })
});

module.exports = router;