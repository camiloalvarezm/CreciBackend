const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./tarea'));
app.use(require('./proyecto'));
app.use(require('./inicio'));

module.exports = app;
