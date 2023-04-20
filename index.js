const express = require('express');
const http = require('http')
const app = express();
const fs = require('fs');
const router = require('./routes/router');
require('dotenv').config();
const { PORT } = process.env;

fs.readdirSync(`${__dirname}/middleware`).forEach(file => {
    app.use(require(`./middleware/${file}`))
})

app.set('view engine', 'pug');

app.use('/', router);

http
    .createServer(app)
    .listen(PORT, () => {
        console.log(`Example app listening at https://localhost:${PORT}`)
    })