const express = require("express");
const Tarea = require("../models/tarea");
const _ = require("underscore");
const app = express();
const cors = require('cors');
const { verificaToken } = require('../middleware/tokenVerify');
app.use(cors());

//crear tarea

app.post("/tarea", verificaToken, (req, res) => {
  let body = req.body;
  let tarea = new Tarea(body);
  tarea.save((err, tareaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      mensaje: "Tarea creada correctamente.",
    });
  });
});

//obtener tareas
app.get("/tarea", verificaToken, (req, res) => {
  Tarea.find(
    { estado: true }
  ).populate('usuarios', 'nombre').exec((err, tareas) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      tareas,
    });
  });
});

//actualizar tarea
app.put("/tarea/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, [
    "nombre",
    "descripcion",
    "dias",
    "horas",
    "minutos",
    "fecha",
    "asignado",
    "usuario"
  ]);

  Tarea.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, tareaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        tarea: tareaDB,
      });
    }
  );
});

//eliminar tarea
app.delete("/tarea/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let borrar = {
    estado: false,
  };
  Tarea.findByIdAndUpdate(id, borrar, (err, borrado) => {
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
          message: "Tarea no encontrada.",
        },
      });
    }
    res.json({
      ok: true,
      tarea: borrado,
    });
  });
});

module.exports = app;
