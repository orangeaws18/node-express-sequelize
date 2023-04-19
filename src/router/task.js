const express = require("express");
const db = require('../../db');

const Task = db.models.Task;

const router = express.Router();

router.post("/", (req, res, next) => {
    const task = {
        taskName: req.body.taskName,
        user_id: req.body.user_id,
    };

    Task.create(task)
        .then(data => {
            res.send(data)
        })
})

router.get("/", (req, res, next) => {
    const condition = null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
})

router.get("/:taskId", (req, res, next) => {
    Task.findByPk(req.params.taskId, { include: ['User']})
        .then(data => {
            res.send(data)

        })
})

module.exports = router