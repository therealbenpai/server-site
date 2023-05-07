const express = require('express');
const https = require('https')
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

https
    .createServer({
        cert: fs.readFile(`${__dirname}\\keys\\cert`, (...x) => null),
        key: fs.readFile(`${__dirname}\\keys\\key`, (...x) => null)
    }, app)
    .listen(PORT, () => {
        console.log(`Example app listening at https://localhost:${PORT}`)
    })