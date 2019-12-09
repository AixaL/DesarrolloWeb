const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');
const middleware = require('./../middleware/token');


// http: //localhost:3001/perros/ver
router.get("/ver", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM mascotas;";
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
  if (!req.body.password || !req.body.nombre || !req.body.correo || !req.body.apellido || !req.body.fechaNac || !req.body.ciudad || !req.body.estado || !req.body.direccion) {
      return res.json({
          // Bad Request
          status: 400,
          msg: 'Revisa que los datos estén completos.',
          data: []
      });
  } else {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO personas(nombre, apellido, fechaNac, ciudad,estado,direccion,tipo,correo,contrasena) 
    VALUES('${req.body.nombre}', '${req.body.apellido}', '${req.body.fechaNac}', '${req.body.ciudad}', '${req.body.estado}', '${req.body.direccion}', '${req.body.tipo}', '${req.body.correo}', '${req.body.password}');
    `;
    console.log(query);
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            // Internal Server Error
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
           
        }
        // 200 OK y 201 Ok por post
        res.status(201);
        res.json({code: 1, message: "Usuario agregado correctamente"});
        db.end((err) => {console.log("closed")});
    })

  }
});



module.exports = router;