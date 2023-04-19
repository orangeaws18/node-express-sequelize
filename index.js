const express = require('express');
const tutorialRouter = require('./src/router/tutorial');

const app = express();

const db = require('./db');

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Synced db.')
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/tutorial', tutorialRouter);

app.listen(PORT, () => {
    console.log(`API 服務啟動在端口 ${PORT}`)
})

