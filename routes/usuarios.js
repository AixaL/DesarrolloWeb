const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dbconn = require('../config/database.js');
const middleware = require('./../middleware/token');


// http: //localhost:3001/perros/ver
router.post("/login", (req,res,next)=>{
    console.log('entra al login')
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM personas WHERE correo = '${req.body.correo}' 
    AND contrasena = '${req.body.password}';`;
    console.log(query)
    db.query(query,(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        if(result.length > 0){
            process.env.JWT_KEY = 'My secret key'
            var us = result[0].usuUsername;
            var idUs = result[0].idUsuario;
            const token = jwt.sign({userId:idUs,user:us}, process.env.JWT_KEY  || 'debugkey')

            res.status(200);
            res.json({code: 1, message: "Hola", token});
            // res.status(200);
            // res.json({code: 1, message: {userId: idUs}})
        } else {
            // restringido
            res.status(401);
            res.json({code: 1, message: "Error en los datos"});
        }
        // Nota: No se pueden mandar dos respuestas.
        db.end((err) => {console.log("closed")});
        
    })
})

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