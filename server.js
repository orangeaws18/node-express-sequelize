const express = require('express');
const cron = require('node-cron');
const db = require('./db');

const jobRouter = require('./src/router/job');
const char2 = require('./src/job/char2');

const app = express();

////////////////////////////////////////////////////////////////////////

// https://crontab.guru/every-month
// At 00:00 on day-of-month 1.
// cron.schedule('0 0 1 * *', job1);

// cron.schedule(' * * * * *', char2);


/////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use('/job', jobRouter)

app.listen(PORT, () => {
    console.log(`API 服務啟動在端口 ${PORT}`)
})

