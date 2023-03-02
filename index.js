const express = require('express');
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { ProfilingIntegration } = require('@sentry/profiling-node')
const Intigrations = require('@sentry/integrations')
const https = require('https')
const fs = require('fs')
const app = express();
const port = 443;

const website = require('./routes/index')
const api = require('./routes/api')

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

app.use(Sentry.Handlers.requestHandler({ transaction: true }));
app.use(Sentry.Handlers.tracingHandler());
// use pug
app.set('view engine', 'pug');
app.use('/api', api);
app.use('/', website);
app.use(Sentry.Handlers.errorHandler({ shouldHandleError: () => { return true } }));
// render 404 page
app.use((req, res, next) => {
    res.status(404).render(
        `${process.cwd()}/vies/misc/404.pug`,
        {
            title: '404 - Page Not Found'
        }
    );
});

https.createServer({
    key: fs.readFileSync(`${process.cwd()}/assets/certs/server.key`),
    cert: fs.readFileSync(`${process.cwd()}/assets/certs/server.cert`),
    handshakeTimeout: 10000,
}, app).listen(port, () => {
    console.log(`Listening on port ${port}`)
})