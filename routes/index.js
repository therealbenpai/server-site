const express = require(`express`);
const router = express.Router();

router.get(`/css/d`, (req, res) => { res.sendFile(`${process.cwd()}/website/stylesheets/general/combined.css`) });

router.get(`/css/c/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/stylesheets/general/${file}`);
});

router.get(`/css/f/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/stylesheets/File-Specific/${file}`);
});

router.get(`/js/fs/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/scripts/File-Specific/${file}`);
});

router.get(`/js/cg/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/scripts/CoG/${file}`);
});

router.get(`/js/o/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/scripts/Other/${file}`);
});

router.get(`/f/fa/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/fonts/Font_Awesome/${file}`);
});

router.get(`/f/:file`, (req, res) => {
    const file = req.params.file;
    res.sendFile(`${process.cwd()}/website/fonts/${file}`);
});

router.get(`/icon`, (req, res) => { res.setHeader(`Content-Type`, `image/x-icon`).sendFile(`${process.cwd()}/website/media/images/icon.ico`) });

router.get(`/bg`, (req, res) => { res.setHeader(`Content-Type`, `image/svg+xml`).sendFile(`${process.cwd()}/website/media/images/background.svg`) });

router.get(`/robots.txt`, (req, res) => { res.sendFile(`${process.cwd()}/website/metadata/robots.txt`) });

router.get(`/sitemap`, (req, res) => { res.setHeader(`Content-Type`, `application/xml`).sendFile(`${process.cwd()}/website/metadata/sitemap.xml`) });

router.get(`/socials`, (req, res) => { res.redirect(`https://sparty182020.carrd.co/`) });

router.get(`/thumbnail`, (req, res) => { res.redirect("https://i.ibb.co/Gs8BsdF/Screenshot-2022-02-28-5-45-23-PM.png") });

router.get(`/chessthumbnail`, (req, res) => { res.redirect("https://cdn.discordapp.com/attachments/999266213697945652/1072217450306883654/image.png") });

router.get(`/chess`, (req, res) => { res.redirect('https://sparty18.me/chess') });

router.get('favicon.ico', (req, res) => { res.sendFile(`${process.cwd()}/website/media/images/icon.ico`) });

router.get(`/:file`, (req, res) => {
    const file = `${req.params.file}${req.params.file.split(`.`).length > 1 ? `` : `.html`}`;
    res.sendFile(`${process.cwd()}/website/html/${file}`, error => {
        if (error) {
            res.status(404).send(`404 Not Found`);
        }
    });
});

router.get(`/`, (req, res) => { res.sendFile(`${process.cwd()}/website/html/index.html`) });

module.exports = router;