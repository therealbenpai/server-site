const express = require('express')
const router = express.Router();

const util = require('../src/util-fuctions')
const ccf = require('../src/crypto')

router.use(express.json())

router.get('/favicon.ico', (_, res) => {
    res.redirect('https://raw.githubusercontent.com/sparty182020/imagehost/main/favicon.ico')
})

router.get('/', (_, res) => {
    res.sendFile('index.html', { root: `${process.cwd()}/api/`, headers: { 'x-timestamp': Date.now(), 'x-sent': true } })
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