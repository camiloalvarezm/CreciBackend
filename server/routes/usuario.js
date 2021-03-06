const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const app = express();
const cors = require('cors');
const { verificaToken } = require('../middleware/tokenVerify');
app.use(cors());

//crear usuario
app.post("/usuario", verificaToken, (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    rol: body.rol,
  });
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      mensaje: "Usuario creado correctamente.",
    });
  });
});

module.exports = app;

//obtener usuarios
app.get("/usuario", verificaToken, (req, res) => {
  Usuario.find({ estado: true }, "nombre email rol").exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuarios,
    });
  });
});

//actualizar usuarios

app.put("/usuario/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'rol', 'password']);
  console.log(body);
  if (body.password) {
    body.password = bcrypt.hashSync(body.password, 10);
  }
  console.log(body);
  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

//eliminar usuario
app.delete("/usuario/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let borrar = {
    estado: false,
  };
  Usuario.findByIdAndUpdate(id, borrar, (err, borrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (!borrado) {
      res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado",
        },
      });
    }
    res.json({
      ok: true,
      usuario: borrado,
    });
  });
});
