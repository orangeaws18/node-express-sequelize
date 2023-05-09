const express = require('express');
const cron = require('node-cron');
const db = require('./db');

const tutorialRouter = require('./src/router/tutorial');
const userRouter = require('./src/router/user');
const taskRouter = require('./src/router/task');

const app = express();

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Synced db.')
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

////////////////////////////////////////////////////////////////////////

const job1 = () => {

    console.log('job1 begin')

    const task = {
        taskName: `${new Date().getMinutes()}-task`,
        user_id: 1,
    };

    db.models.Task.create(task)
        .then(data => {
            console.log('job1 end')
        })

}

cron.schedule('* * * * * *', job1);
















/////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use('/tutorial', tutorialRouter);
app.use('/user', userRouter);
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log(`API 服務啟動在端口 ${PORT}`)
})

