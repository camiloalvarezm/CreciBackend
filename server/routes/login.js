const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const app = express();
const cors = require('cors');
app.use(cors());

app.post("/login", (req, res) => {
  let body = req.body;
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          mensaje: "Usuario o contraseña incorrecto.",
        },
      });
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          mensaje: "Usuario o contraseña incorrecto.",
        },
      });
    }
    let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {
      expiresIn: process.env.CADUCIDAD_TOKEN,
    });
    res.json({
      ok: true,
      token
    });
  });
});

app.get("/login", (req, res) => {
  res.json({
    mensaje: "Funcionando",
  });
});

app.post("/login/usuario", (req, res) => {
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
