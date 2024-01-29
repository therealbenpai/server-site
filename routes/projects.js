const router = require('express').Router();
const fs = require('fs');

router
    .get('/', (req, res) => {
        res.render(
            `projects/index.pug`,
        )
    })
    .get('/minesweeper', (req, res) => {
        res.render('projects/minesweeper.pug')
    })
    .get('/minesweeperbuilder', (req, res) => {
        res.send(
            fs.readFileSync(
                `${process.cwd()}/projects/minesweeper_builder.html`,
                'utf8'
            )
        );
    });

module.exports = router;