const express = require('express');
const router = express.Router();
const rateLimiter = require('express-rate-limit');

const website = require('./main')
const api = require('./api');
const cdn = require('./cdn');
const projects = require('./projects');
const legal = require('./legal');

const limiter = rateLimiter.rateLimit({
    windowMs: 1000,
    max: 10,
    legacyHeaders: false,
    standardHeaders: true,
    handler: (req, res, next, options) => res.status(429).render(`misc/429.pug`, { title: '429 - Too Many Requests' }),
    skip: (req, res) => ['/css','/js','/f','/icon','/bg','/thumbnail'].some(endpoint => req.path.startsWith(endpoint))
});

router.use(limiter);

router.use('/', website);
router.use('/api', api);
router.use('/cdn', cdn);
router.use('/projects', projects);
router.use('/legal', legal);

module.exports = router;