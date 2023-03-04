const express = require('express')
const router = express.Router();
const fs = require('fs')

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

router.get('/staff', (req, res) => {
    res.send(
        require(`${process.cwd()}/API/staff.json`)
    )
})

router.get('/qd/:name', (req, res) => {
    res.send(fs.readFileSync(`${process.cwd()}/API/quick_data/${req.params.name}`))
})

router.get('/qd/names', (_, res) => {
    res.sendFile(`${process.cwd()}/API/quick_data/names.json`)
})

module.exports = router