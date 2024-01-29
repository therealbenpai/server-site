const router = require('express').Router();

router
    .get(`/css/d`, (req, res) => { res.sendFile(`${process.cwd()}/assets/stylesheets/general/combined.css`) })
    .get(`/css/c/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/stylesheets/general/${file}.css`);
    })
    .get(`/css/f/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/stylesheets/file-specific/${file}.css`);
    })
    .get(`/js/fs/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/scripts/File-Specific/${file}`);
    })
    .get(`/js/cg/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/scripts/CoG/${file}`);
    })
    .get(`/js/o/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/scripts/Other/${file}`);
    })
    .get(`/f/:file`, (req, res) => {
        const file = req.params.file;
        res.sendFile(`${process.cwd()}/assets/fonts/${file}`);
    })
    .get(`/icon`, (req, res) => {
        res
            .setHeader('Cache-Control', 'no-cache')
            .setHeader(`Content-Type`, `image/x-icon`)
            .sendFile(`${process.cwd()}/assets/media/images/icon.ico`)
    })
    .get(`/bg`, (req, res) => {
        res
            .setHeader('Cache-Control', 'no-cache')
            .setHeader(`Content-Type`, `image/svg+xml`)
            .sendFile(`${process.cwd()}/assets/media/images/background.svg`)
    })
    .get(`/robots.txt`, (req, res) => {
        res
            .sendFile(`${process.cwd()}/metadata/robots.txt`)
    })
    .get(`/sitemap`, (req, res) => {
        res
            .setHeader(`Content-Type`, `application/xml`)
            .sendFile(`${process.cwd()}/metadata/sitemap.xml`)
    })
    .get(`/socials`, (req, res) => {
        res
            .redirect(`https://benpai.carrd.co/`)
    })
    .get(`/thumbnail`, (req, res) => {
        res
            .setHeader('Cache-Control', 'no-cache')
            .redirect("https://cdn.discordapp.com/attachments/999266213697945652/1081273691867992124/image.png")
    })
    .get(`/chessthumbnail`, (req, res) => {
        res
            .setHeader('Cache-Control', 'no-cache')
            .redirect("https://cdn.discordapp.com/attachments/999266213697945652/1072217450306883654/image.png")
    })
    .get(`/chess`, (req, res) => {
        res
            .redirect('https://sparty18.me/chess')
    })
    .get('/favicon.ico', (req, res) => {
        res
            .setHeader('Cache-Control', 'no-cache')
            .sendFile(`${process.cwd()}/assets/media/images/icon.ico`)
    })
    .get('/blank', (req, res) => {
        res.render(
            `main/blank.pug`,
            {
                title: "Blank",
            }
        );
    })
    .get('/about-me', (req, res) => {
        res.render(
            `main/about-me.pug`,
            {
                title: "About Me",
                page: 2,
                file: "about-me"
            }
        );
    })
    .get('/cornhole', (req, res) => {
        res.render(
            `main/cornhole.pug`,
            {
                title: "Cornhole Score Keeper",
                file: "cornhole"
            }
        );
    })
    .get('/game', (req, res) => {
        res.render(
            `main/game.pug`,
            {
                title: "Keyboard and Mouse Game",
                page: 3,
                file: "game"
            }
        );
    })
    .get('/socials', (req, res) => {
        res.render(
            `main/socials.pug`,
            {
                title: 'Socials',
                page: 4
            }
        );
    })
    .get('/toolbox', (req, res) => {
        res.render(
            `main/toolbox.pug`,
            {
                title: 'Developmental Toolbox',
                file: 'toolbox'
            }
        );
    })
    .get('/web-gen', (req, res) => {
        res.render(
            `main/website-generator.pug`,
            {
                title: 'Website Generator',
                file: 'website-generator'
            }
        );
    })
    .get('/index', (req, res) => {
        res.render(
            `main/index.pug`,
            {
                title: 'Homepage',
                page: 1,
                file: 'index'
            }
        );
    })
    .get(`/`, (req, res) => {
        res.render(
            `main/index.pug`,
            {
                title: 'Homepage',
                page: 1,
                file: 'index'
            }
        );
    });

module.exports = router;