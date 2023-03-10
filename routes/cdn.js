const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/transcript/:id', (req, res) => {
    const { id } = req.params;
    res.send(fs.readFileSync(`/CDN/BenpaiBot/transcripts/${id}`, 'utf8'));
})

module.exports = router;