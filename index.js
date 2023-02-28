const express = require('express');
const app = express();
const port = 80;

const website = require('./routes/index')
const api = require('./routes/api')

app.use('/', website);
app.use('/api', api);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});