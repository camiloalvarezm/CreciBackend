const express = require("express");
const Proyecto = require("../models/proyecto");
const _ = require("underscore");
const app = express();
const cors = require('cors');
const { populate } = require("../models/proyecto");
app.use(cors());

//crear proyecto

app.post("/proyecto", (req, res) => {
  let body = req.body;
  let proyecto = new Proyecto(body);
  proyecto.save((err, proyectoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      mensaje: "Proyecto creado correctamente.",
    });
  });
});

//obtener proyectos
app.get("/proyecto", (req, res) => {
  Proyecto.find(
    { estado: true },
    "nombre descripcion"
  ).populate('usuarios', 'nombre').exec((err, proyectos) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      proyectos,
    });
  });
});

//actualizar proyecto
app.put("/proyecto/:id", (req, res) => {
  let id = req.params.id;
  let usuario = req.body.usuario;

  Proyecto.findByIdAndUpdate(
    id,
    { $push: { usuarios: usuario } },
    { new: true, runValidators: true },
    (err, proyectoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        tarea: proyectoDB,
      });
    }
  );
});

//eliminar proyecto
app.delete("/proyecto/:id", (req, res) => {
  let id = req.params.id;
  let borrar = {
    estado: false,
  };
  Proyecto.findByIdAndUpdate(id, borrar, (err, borrado) => {
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
          message: "Proyecto no encontrado",
        },
      });
    }
    res.json({
      ok: true,
      proyecto: borrado,
    });
  });
});

module.exports = app;
