const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const { ProfilingIntegration } = require('@sentry/profiling-node')
const Intigrations = require('@sentry/integrations')
const https = require('https')
const fs = require('fs')
const app = express();
const rateLimiter = require('express-rate-limit');

const website = require('./routes/index')
const api = require('./routes/api');
const cdn = require('./routes/cdn');
const discord = require('./routes/discord/main');

Sentry.init({
    dsn: "https://90738d20a91d4f169081dfbea05bc8d4@o4504516705058816.ingest.sentry.io/4504771825303552",
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

const limiter = rateLimiter.rateLimit({
    windowMs: 1000,
    max: 10,
    legacyHeaders: false,
    standardHeaders: true,
    handler: (req, res, next, options) => res.status(429).render(`${process.cwd()}/views/misc/429.pug`, { title: '429 - Too Many Requests' }),
    skip: (req, res) => ['/css','/js','/f','/icon','/bg','/thumbnail'].some(endpoint => req.path.startsWith(endpoint))
});

app.use(Sentry.Handlers.requestHandler({ transaction: true }));
app.use(Sentry.Handlers.tracingHandler());
// use pug
app.set('view engine', 'pug');
app.use(limiter);
app.use('/', website);
app.use('/api', api);
app.use('/cdn', cdn);
app.use('/discord', discord);
app.use((err, req, res, next) => {
        switch (err.status) {
            case 401:
            case 403:
                res.status(err.status).render(
                    `${process.cwd()}/views/misc/401.pug`,
                    {
                        title: `401 - Unauthorized`,
                        path: req.path,
                        code: err.status
                    }
                );
                break;
            case 404:
                next();
                break;
            case 405:
                // find the allowed methods for the path
                const { path } = req;
                const allowedMethods = app._router.stack
                    .filter(r => r.route && r.route.path === path)
                    .map(r => r.route.stack[0].method.toUpperCase())
                    .join(', ');
                const methodUsed = req.method.toUpperCase();
                res.status(405).render(
                    `${process.cwd()}/views/misc/405.pug`,
                    {
                        title: '405 - Method Not Allowed',
                        path,
                        allowedMethods,
                        methodUsed
                    }
                );
                break;
            default:
                const errorId = Sentry.captureException(err);
                res
                    .status(501)
                    .setHeader('X-Error-ID', errorId)
                    .render(
                        `${process.cwd()}/views/misc/501.pug`,
                        {
                            title: `501 - Internal Server Error`,
                            errorId
                        }
                    )
                break;
        }
    }
);
app.use((req, res, next) => {
    res.status(404).render(
        `${process.cwd()}/views/misc/404.pug`,
        {
            title: '404 - Page Not Found',
            path: req.path
        }
    );
})



if (process.platform === 'win32') {
    https.createServer({
        key: fs.readFileSync(`${process.cwd()}\\assets\\certs\\server.key`),
        cert: fs.readFileSync(`${process.cwd()}\\assets\\certs\\server.cert`)
    }, app).listen(443, () => {
        console.log(`Example app listening at https://localhost:443`)
    })
} else {
    app.listen(3001, () => {
        console.log(`Example app listening at http://localhost:3001`)
    })
}