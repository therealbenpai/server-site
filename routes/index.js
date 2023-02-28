const express = require('express');
const router = express.Router();

router.get('/css/d', (req, res) => {
    res.sendFile('../website/stylesheets/general/combined.css', { root: __dirname });
});

router.get('/css/c/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(`../website/stylesheets/general/${file}.css`, { root: __dirname });
});

router.get('/css/f/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(`../website/stylesheets/File-Specific/${file}.css`, { root: __dirname });
});

router.get('/js/cg/:file', (req, res) => {});

router.get('/js/o/:file', (req, res) => {});

router.get('/f/fa/:file', (req, res) => {});

router.get('/f/:file', (req, res) => {});

router.get('/icon', (req, res) => {});

router.get('/bg', (req, res) => {});

router.get('/robots.txt', (req, res) => {});

router.get('/sitemap', (req, res) => {});

router.get('/repo', (req, res) => {});

router.get('/socials', (req, res) => {});

router.get('/thumbnail', (req, res) => {});

router.get('/chessthumbnail', (req, res) => {});

router.get('/chess', (req, res) => {});

router.get('/:file', (req, res) => {});

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;