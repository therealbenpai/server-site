const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const Intigrations = require('@sentry/integrations')
const http = require('http')
const app = express();
const router = require('./routes/router');

Sentry.init({
    dsn: "https://90738d20a91d4f169081dfbea05bc8d4@o4504516705058816.ingest.sentry.io/4504771825303552",
    sampleRate: 1.0,
    serverName: "Main PC",
    integrations: [
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
    environment: "MasterDevelopment",
    release: "v1.1.2-Private_Alpha",
    sendDefaultPii: true
});

app.use(Sentry.Handlers.requestHandler({ transaction: true }));
app.use(Sentry.Handlers.tracingHandler());
app.set('view engine', 'pug');
app.use('/', router);
app.use((err, req, res, next) => {
    switch (err.status) {
        case 401:
        case 403:
            res.status(err.status).render(
                `misc/401.pug`,
                {
                    title: `401 - Unauthorized`,
                    path: req.path,
                    code: err.status
                }
            );
            break;
        case 404:
            res.status(404).render(
                `misc/404.pug`,
                {
                    title: '404 - Page Not Found',
                    path: req.path
                }
            );
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
                `misc/405.pug`,
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
                    `misc/501.pug`,
                    {
                        title: `501 - Internal Server Error`,
                        errorId
                    }
                )
            break;
    }
}
);


http
.createServer(app)
.listen(443, () => {
    console.log(`Example app listening at https://localhost:443`)
})