const express = require('express');
const cors = require('cors');

const AuthenticationRoutes = require('./routes/AuthenticationRoutes');

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.set('json spaces', 2);

app.use('/auth', AuthenticationRoutes);

module.exports = app;