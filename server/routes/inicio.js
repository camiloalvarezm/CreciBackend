const express = require('express');
const app = express();
const cors = require('cors');
const Tarea = require("../models/tarea");
const Usuario = require("../models/usuario");
const Proyecto = require("../models/proyecto");

app.use(cors());


app.get('/inicio/tareas/:id', (req, res) => {
    Tarea.where({ estado: true }).countDocuments().exec((err, tareas) => {
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

app.get('/inicio/proyectos/:id', (req, res) => {
    Proyecto.where({ estado: true, }).countDocuments().exec((err, proyectos) => {
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

app.get('/inicio/usuarios/desarrollo', (req, res) => {
    Usuario.where({ estado: true, rol: 'DESARROLLADOR' }).countDocuments().exec((err, usuarios) => {
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

app.get('/inicio/usuarios/lider', (req, res) => {
    Usuario.where({ estado: true, rol: 'LIDER' }).countDocuments().exec((err, usuarios) => {
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

module.exports = app;