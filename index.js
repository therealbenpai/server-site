const express = require('express')
const app = express();
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { ProfilingIntegration } = require('@sentry/profiling-node')
const Intigrations = require('@sentry/integrations')
const https = require('https')
const fs = require('fs')

const website = require('./routes/index')
const api = require('./routes/api');

Sentry.init({
    dsn: "https://90738d20a91d4f169081dfbea05bc8d4@o4504516705058816.ingest.sentry.io/4504771825303552",
    sampleRate: 1.0,
    serverName: "Main PC",
    integrations: [
        new ProfilingIntegration(),
        new Intigrations.ExtraErrorData({ depth: 25 }),
        new Intigrations.SessionTiming(),
        new Intigrations.Transaction(),
        new Intigrations.ReportingObserver(),
        new Intigrations.CaptureConsole({
            levels: ['error', 'warn']
        }),
        new Sentry.Integrations.Http({
            tracing: true,
            breadcrumbs: true
        }),
        new Tracing.Integrations.Express({ app: app })
    ],
    // @ts-ignore
    profilesSampleRate: 1.0,
    environment: "MasterDevelopment",
    release: "v1.1.2-Private_Alpha",
    sendDefaultPii: true
});

app.use(Sentry.Handlers.requestHandler({ transaction: true }));
app.use(Sentry.Handlers.tracingHandler());
app.set('view engine', 'pug');
app.use('/', website);
app.use('/api', api);
app.use(Sentry.Handlers.errorHandler({ shouldHandleError: (_) => true}));
app.use(
    (err, req, res, options) => {
        switch (err.status) {
            case 401:
            case 403:
                res.status(err.status).render(
                    `${process.cwd()}/views/misc/401.pug`,
                    {
                        title: `${err.status} - Unauthorized`,
                        path: req.path,
                        code: err.status
                    }
                );
                break;
            case 400:
            case 404:
                res.status(404).render(
                    `${process.cwd()}/views/misc/404.pug`,
                    {
                        title: '404 - Page Not Found',
                        path: req.path
                    }
                );
                break;
            case 405:
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
                res
                    .status(501)
                    .render(
                        `${process.cwd()}/views/misc/501.pug`,
                        {
                            title: `${err.status} - Internal Server Error`,
                        }
                    )
                break;
        }
    }
);

https.createServer({
    key: fs.readFileSync(`${process.cwd()}/assets/certs/server.key`),
    cert: fs.readFileSync(`${process.cwd()}/assets/certs/server.cert`),
    handshakeTimeout: 10000,
}, app).listen(443, () => {
    console.log(`Listening on port 443`)
})