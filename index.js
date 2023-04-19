const express = require('express');
const router = require('express').Router();

const tutorials = require('./src/controllers/tutorial.controller');

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

const app = express();

app.use(express.json());

router.post('/', tutorials.create)
router.get('/', tutorials.findAll)

app.use('/', router);

app.listen(PORT, () => {
    console.log(`API 服務啟動在端口 ${PORT}`)
})

