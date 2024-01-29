const express = require('express')
const router = express.Router();
const fs = require('fs')

const util = require('../src/util-fuctions')
const ccf = require('../src/crypto')

router
    .use(express.json())
    .get('/favicon.ico', (_, res) => {
        res.redirect('https://sparty18.com/icon')
    })
    .get('/', (_, res) => {
        res.render(
            `api/index.pug`,
            {
                title: 'API Homepage'
            }
        );
    })
    .get('/enc', (req, res) => {
        if (!req.body.data) {
            res.status(400).send(util.failedStatus('Missing data\nData: ' + req.body)).end()
            return
        }
        const enc = ccf.semiEnc(req.body.data)
        res.status(200).send({ enc: enc })
    })
    .get('/dec', (req, res) => {
        if (!req.body.data) {
            res.status(400).send(util.failedStatus('Missing data'))
            return
        }
        const dec = ccf.semiDec(req.body.data)
        res.status(200).send({ dec: dec })
    })
    .get('/util', (_, res) => res.setHeader('Content-Type', 'text/javascript').send(fs.readFileSync(`${process.cwd()}/API/util.js`).toString()))

module.exports = router