const express = require('express');
const router = express.Router();
const fs = require('fs');
const mariadb = require('mariadb');

const connection = maria.createConnection({
    host: "68.66.23.216",
    user: "benpai",
    password: "BenpaiIsCool",
    database: "sanrio",
});

router.get('/transcript/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT transcript FROM tickets WHERE id = ${id}`;
    connection.query(sql, (err, rows) => {
        if (rows.length === 0) return
        res.send(fs.readFileSync(`${process.env.HOME}/cdn/tickets/${rows[0].transcript}.html`, 'utf8'))
    })
})

router.get('/discord', (req, res) => res.redirect('https://discord.gg/TQ722XTzxu'))

module.exports = router;