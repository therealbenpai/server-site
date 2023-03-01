const express = require(`express`);
const router = express.Router();

router.get(`/css/d`, (req, res) => { res.sendFile(`${process.cwd()}/assets/stylesheets/general/combined.css`) });

router.get(`/css/c/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/stylesheets/general/${file}`);
});

router.get(`/css/f/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/stylesheets/file-specific/${file}`);
});

router.get(`/js/fs/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/scripts/File-Specific/${file}`);
});

router.get(`/js/cg/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/scripts/CoG/${file}`);
});

router.get(`/js/o/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/scripts/Other/${file}`);
});

router.get(`/f/fa/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/fonts/Font_Awesome/${file}`);
});

router.get(`/f/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/assets/fonts/${file}`);
});

router.get(`/icon`, (req, res) => { res.setHeader(`Content-Type`, `image/x-icon`).sendFile(`${process.cwd()}/assets/media/images/icon.ico`) });

router.get(`/bg`, (req, res) => { res.setHeader(`Content-Type`, `image/svg+xml`).sendFile(`${process.cwd()}/assets/media/images/background.svg`) });

router.get(`/robots.txt`, (req, res) => { res.sendFile(`${process.cwd()}/website/metadata/robots.txt`) });

router.get(`/sitemap`, (req, res) => { res.setHeader(`Content-Type`, `application/xml`).sendFile(`${process.cwd()}/website/metadata/sitemap.xml`) });

router.get(`/socials`, (req, res) => { res.redirect(`https://sparty182020.carrd.co/`) });

router.get(`/thumbnail`, (req, res) => { res.redirect("https://i.ibb.co/Gs8BsdF/Screenshot-2022-02-28-5-45-23-PM.png") });

router.get(`/chessthumbnail`, (req, res) => { res.redirect("https://cdn.discordapp.com/attachments/999266213697945652/1072217450306883654/image.png") });

router.get(`/chess`, (req, res) => { res.redirect('https://sparty18.me/chess') });

router.get('favicon.ico', (req, res) => { res.sendFile(`${process.cwd()}/assets/media/images/icon.ico`) });

router.get('/about-me', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/about-me.pug`,
        {
            title: "About Me"
        }
    );
})

router.get('/cornhole', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/cornhole.pug`,
        {
            title: "Cornhole Score Keeper"
        }
    );
})

router.get('/game', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/game.pug`,
        {
            title: "Keyboard and Mouse Game"
        }
    );
})

router.get('/socials', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/socials.pug`,
        {
            title: 'Socials'
        }
    );
})

router.get('/text-conv', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/text-converter.pug`,
        {
            title: 'Text Conversion'
        }
    );
})

router.get('/toolbox', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/toolbox.pug`,
        {
            title: 'Developmental Toolbox'
        }
    );
})

router.get('/web-gen', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/website-generator.pug`,
        {
            title: 'Website Generator'
        }
    );
})

router.get('/index', (req, res) => {
    res.render(
        `${process.cwd()}/views/main/index.pug`,
        {
            title: 'Homepage'
        }
    );
})

router.get(`/`, (req, res) => {
    res.render(
        `${process.cwd()}/views/main/index.pug`,
        {
            title: 'Homepage'
        }
    );
});

module.exports = router;