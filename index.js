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

app.use(Sentry.Handlers.requestHandler({transaction: true}));
app.use(Sentry.Handlers.tracingHandler());
app.use('/api', api);
app.use('/', website);
app.use(Sentry.Handlers.errorHandler({shouldHandleError: () => { return true }}));

function getKeyAndCert() {
    const data = {}
    if (fs.existsSync('/etc/letsencrypt/live/sparty18.com/')) {
        data.key = fs.readFileSync('/etc/letsencrypt/live/sparty18.com/privkey.pem')
        data.cert = fs.readFileSync('/etc/letsencrypt/live/sparty18.com/fullchain.pem')
    } else {
        data.key = fs.readFileSync(`${process.cwd()}/certs/server.key`)
        data.cert = fs.readFileSync(`${process.cwd()}/certs/server.cert`)
    }
    return data
}

https.createServer(getKeyAndCert(), app).listen(port, () => {
    console.log(`Listening on port ${port}`)
})