const fs = require('fs');
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sparty18.com',
    user: 'benpai',
    password: 'benpaiIsCool',
    database: 'benpai'
});

router.get('/transcript/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT transcript FROM tickets WHERE id = ${id}`;
    await connection.promise().query(sql).then(([rows, fields]) => {
        if (rows.length === 0) return
        res.send(res.send(fs.readFileSync(`/CDN/BenpaiBot/transcripts/${rows[0].transcript}`, 'utf8')))
    })
})

module.exports = router;