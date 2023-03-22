const express = require('express');
const router = express.Router();
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' })
const DiscordApi = require('discord-api-types/v10');

// routes for ban, mute, and kick
router.post('/ban', (req, res) => {
    const { serverID, userID, reason, token } = req.body;
    rest.setToken(token);
    rest.put(
        DiscordApi.Routes.guildBan(serverID, userID),
        {
            body: {
                delete_message_days: 7
            },
            headers: {
                'X-Audit-Log-Reason': reason
            }
        }
    ).then(() => {
        // console.log('Banned user');
    }).catch(err => {
        console.error(err);
    });
    res.redirect('/discord/banUser');
});

router.post('/mute', (req, res) => {
    const { serverID, userID, reason, length, token } = req.body;
    rest.setToken(token);
    rest.patch(
        DiscordApi.Routes.guildMember(serverID, userID),
        {
            body: {
                communication_disabled_until: length
            },
            headers: {
                'X-Audit-Log-Reason': reason
            }
        }
    ).then(() => {
        // console.log('Muted user');
    }).catch(err => {
        console.error(err);
    });
    res.redirect('/discord/muteUser');
});

router.post('/kick', (req, res) => {
    const { serverID, userID, reason, token } = req.body;
    rest.setToken(token);
    rest.delete(
        DiscordApi.Routes.guildMember(serverID, userID),
        {
            headers: {
                'X-Audit-Log-Reason': reason
            }
        }
    ).then(() => {
        // console.log('Kicked user');
    }).catch(err => {
        console.error(err);
    });
    res.redirect('/discord/kickUser');
});

module.exports = router;