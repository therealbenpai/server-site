const express = require('express');
const router = express.Router();

const website = require('./main')
const api = require('./api');
const cdn = require('./cdn');
const projects = require('./projects');

router.use('/', website);
router.use('/api', api);
router.use('/cdn', cdn);
router.use('/projects', projects);

module.exports = router;