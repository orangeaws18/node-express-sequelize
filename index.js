const express = require('express');
const tutorialRouter = require('./src/router/tutorial');
const userRouter = require('./src/router/user');
const taskRouter = require('./src/router/task');

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

const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use('/tutorial', tutorialRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log(`API 服務啟動在端口 ${PORT}`)
})

