const express = require('express')
const router = express.Router();

const util = require('../src/util-fuctions')
const ccf = require('../src/crypto')

router.use(express.json())

router.get('/favicon.ico', (_, res) => {
    res.redirect('https://sparty18.com/icon')
})

router.get('/', (_, res) => {
    res.render(
        `${process.cwd()}/views/api/index.pug`,
        {
            title: 'API Homepage'
        }
    );
})

router.get('/enc', (req, res) => {
    if (!req.body.data) {
        res.status(400).send(util.failedStatus('Missing data\nData: ' + req.body)).end()
        return
    }
    const enc = ccf.semiEnc(req.body.data)
    res.status(200).send({ enc: enc })
})

router.get('/dec', (req, res) => {
    if (!req.body.data) {
        res.status(400).send(util.failedStatus('Missing data'))
        return
    }
    const dec = ccf.semiDec(req.body.data)
    res.status(200).send({ dec: dec })
})

module.exports = router