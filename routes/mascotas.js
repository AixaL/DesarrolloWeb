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

// http: //localhost:3001/perros/ver
router.get("/perros", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM mascotas WHERE especie='canino' AND status =1 ;";
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({
                code: 0,
                message: "Algo salió mal"
            });
        }
        console.log(result);
        res.status(200);
        res.json({
            code: 1,
            message: result
        });
        db.end((err) => {
            console.log("closed")
        });
    })
});

router.get("/getMascota", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT p.ciudad, p.nombre, p.apellido, p.correo, m.* FROM personas p,mascotas m WHERE m.cuidador=p.idPersona AND m.idMascota ='${req.body.idMascota}' ;`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({
                code: 0,
                message: "Algo salió mal"
            });
        }
        console.log(result);
        res.status(200);
        res.json({
            code: 1,
            message: result
        });
        db.end((err) => {
            console.log("closed")
        });
    })
});

router.post("/agregar", (req, res, next) => {
    if (!req.body.nombre || !req.body.especie || !req.body.status || !req.body.cuidador || !req.body.sexo || !req.body.caracteristicas || !req.body.edad) {
        return res.json({
            // Bad Request
            status: 400,
            msg: 'Revisa que los datos estén completos.',
            data: []
        });
    } else {
        const db = mysql.createConnection(dbconn);
        const query = `INSERT INTO mascotas(nombre, especie, status, cuidador,sexo,caracteristicas,edad,agresivo,discapacitado) 
    VALUES('${req.body.nombre}', '${req.body.especie}', '${req.body.status}', '${req.body.cuidador}', '${req.body.sexo}', '${req.body.caracteristicas}', '${req.body.edad}', '${req.body.agresivo}', '${req.body.discapacitado}');
    `;
        console.log(query);
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                // Internal Server Error
                res.status(500);
                res.json({
                    code: 0,
                    message: "Algo salió mal"
                });

            }
            // 200 OK y 201 Ok por post
            res.status(201);
            res.json({
                code: 1,
                message: "Usuario agregado correctamente"
            });
            db.end((err) => {
                console.log("closed")
            });
        })

    }
});

module.exports = router;