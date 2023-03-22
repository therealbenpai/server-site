const express = require('express');
const router = express.Router();
const messageRoutes = require('./message');
const moderationRoutes = require('./moderation');
const BodyParser = require('body-parser');

router.use(BodyParser.urlencoded({ extended: true }));

router.use('/message', messageRoutes);
router.use('/moderation', moderationRoutes);

module.exports = router;