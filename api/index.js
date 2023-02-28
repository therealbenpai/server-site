// @ts-nocheck
// NPM Packages
const express = require('express')
const path = require('path')
const limiter = require('express-rate-limit')
const axios = require('axios').default
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { ProfilingIntegration } = require('@sentry/profiling-node')
const Intigrations = require('@sentry/integrations')
require('dotenv').config()

// Custom Packages
const util = require('./src/util-fuctions')
const ccf = require('./src/crypto')
const { genAPIKey, verifyAPIKey, genTempKey, verifyTempKey } = require('./src/token')
const { whitelist, blacklist } = require('./config/ips.json')
const { valid_paths } = require('./config/config.json')
const { createSession, CheckPayment } = require('./src/payments')
const app = express();
const PORT = process.env.PORT || 80;

Sentry.init({
    dsn: "https://82f73b485cdc419699fe0e52e2daadd0@o1236511.ingest.sentry.io/4504203537350656",
    sampleRate: 1.0,
    serverName: "Main PC",
    integrations: [
        new ProfilingIntegration(),
        new Intigrations.ExtraErrorData({ depth: 10 }),
        new Intigrations.SessionTiming(),
        new Intigrations.Transaction(),
        new Intigrations.ReportingObserver(),
        new Intigrations.CaptureConsole({
            levels: ['error', 'critical', 'fatal', 'warn']
        }),
        new Sentry.Integrations.Http({
            tracing: true,
            breadcrumbs: true
        }),
        new Tracing.Integrations.Express({ app })
    ],
    // @ts-ignore
    profilesSampleRate: 1.0,
    environment: "MasterDevelopment",
    release: "v1.1.2-Private_Alpha",
    sendDefaultPii: true
});

const transaction = Sentry.startTransaction({
    op: 'transaction',
    name: `Transaction ${require('uuid').v4()}`,
})

app.use(Sentry.Handlers.requestHandler({
    transaction: true
}));
app.use(Sentry.Handlers.tracingHandler());

const rl = limiter.rateLimit({
    windowMs: 15 * 60000,
    max: 100,
    message: 'Too many requests from this IP, please try again later',
    skip: (req) => { return (whitelist.includes(req.ip) || req.url.includes('.ico')) }
})

app.use(rl)

app.use(express.json())

app.use(Sentry.Handlers.errorHandler({
    shouldHandleError: () => { return true }
}));

var pageload;

app.all('*', (req, _res, next) => {
    pageload = Sentry.startTransaction({
        op: 'pageload',
        name: `Pageload ${req.path}`,
    })
    const usermap = require('./config/ip_maps.json')
    Sentry.setUser({
        ip_address: req.ip,
        email: usermap[req.ip]?.email || "user@example.com",
        username: `${usermap[req.ip]?.username} (${usermap[req.ip]?.name})` || "Unknown User"
    })
    next()
})

app.all('*', (req, res, next) => {
    if (!valid_paths.includes(req.path)) {
        res.status(404).send("404 Not Found")
        console.error(`404 Not Found: ${req.path}`)
        pageload.finish()
        return
    }
    if (req.path == '/favicon.ico') {
        next()
        return
    }
    if (blacklist.includes(req.ip.replace('::ffff:', ''))) {
        sendHTMLFile('banned.html', res, 403)
        pageload.finish()
        return
    }
    next()
})

app.all('/favicon.ico', (_req, res) => {
    axios
        .get('https://raw.githubusercontent.com/sparty182020/imagehost/main/background1.svg')
        .then(ares => {
            res.header('Content-Type', 'image/svg+xml')
            res.status(200).send(ares.data)
        })
    pageload.finish()
})


app.all('/', (_req, res) => {
    sendHTMLFile('index.html', res, 200)
    pageload.finish()
})

app.all('/dev/log', (req, res) => {
    const log = `Headers: ${req.headers}\n\nBody: ${req.body}`
    console.log(log)
    res.status(200)
    pageload.finish()
})

// Authentication
app.all('*', (req, res, next) => {
    if (req.url.includes('signup') || req.url.includes('genkey')) return next();
    if (!req.headers.authorization) {
        res.status(401).end()
        console.error('missing auth headers')
        pageload.finish()
        return
    }
    const [type, token] = req.headers.authorization.split(' ')
    if (type != 'Bearer') {
        res.status(401).end();
        console.error('invalid auth type')
        pageload.finish()
        return
    }
    if (!verifyAPIKey(token)) {
        res.status(401).end()
        console.error('invalid token')
        pageload.finish()
        return
    }
    next()
})

// Method Testing
app.all('*', (req, res, next) => {
    const uriMethods = require('./config/valid_methods.json')
    const uri = req.path
    const method = req.method
    let v;
    uriMethods[uri].forEach((data) => {
        if (data == method) {
            v = true
            next()
        }
    })
    if (!v) {
        sendHTMLFile('400.html', res, 400)
        pageload.finish()
    }
})

app.all('/genkey', async (req, res) => {
    if (!req.params.session_id) {console.log("missing Session"); return res.status(401).end().destroy()}
    if (!await CheckPayment(req.params.session_id)) {console.log("Invalid Session"); return res.status(401).end().destroy()}
    const key = genAPIKey(req.ip)
    res.status(200).send({ key: key }).end()
})

app.all('/signup', async (req, res, _) => {
    const session = await createSession();
    res.redirect(session.url)
})

app.get('/enc', (req, res) => {
    if (!req.body.data) {
        res.status(400).send(util.failedStatus('Missing data\nData: ' + req.body)).end()
        pageload.finish()
        return
    }
    const enc = ccf.semiEnc(req.body.data)
    res.status(200).send({ enc: enc })
    pageload.finish()
})

app.get('/dec', (req, res) => {
    if (!req.body.data) {
        res.status(400).send(util.failedStatus('Missing data'))
        pageload.finish()
        return
    }
    const dec = ccf.semiDec(req.body.data)
    res.status(200).send({ dec: dec })
    pageload.finish()
})

app.listen(PORT, () => {
    console.log("The Server is now up and running!")
    transaction.finish()
})

function sendHTMLFile(filename, res, status) {
    var options = {
        root: path.join(__dirname, 'html'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.status(status).sendFile(filename, options, function () { })
}