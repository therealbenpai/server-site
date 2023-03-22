const express = require('express');
const router = express.Router();
const api = require('./api')

router.use('/api', api);

router.get('/sendMessage', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/send.pug`,
        {
            title: 'Send Message',
        }
    );
});

router.get('/replyToMessage', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/reply.pug`,
        {
            title: 'Reply To Message',
        }
    );
});

router.get('/dmUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/dm.pug`,
        {
            title: 'Direct Message User',
        }
    );
});

// make routes for muting, banning, and kicking

router.get('/muteUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/mute.pug`,
        {
            title: 'Mute User',
        }
    );
});

router.get('/banUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/ban.pug`,
        {
            title: 'Ban User',
        }
    );
});

router.get('/kickUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/discord/kick.pug`,
        {
            title: 'Kick User',
        }
    );
});

module.exports = router;