const express = require("express");
const db = require('../../db');

const User = db.models.User;

const router = express.Router();

router.post("/", (req, res, next) => {
    const user = {
        firstName: req.body.firstName
    };

    User.create(user)
        .then(data => {
            res.send(data)
        })
})

router.get("/", (req, res, next) => {
    const condition = null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
})

router.get("/:userId", (req, res, next) => {
    const condition = null;

    User.findByPk(req.params.userId, { include: ['tasks']})
        .then(data => {
            res.send(data)
        })
})

module.exports = router