const express = require("express");
const db = require('../../db');

const Tutorial = db.models.Tutorial;

const router = express.Router();

router.post("/", (req, res, next) => {
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        })
})

router.get("/", (req, res, next) => {
    const condition = null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
})

module.exports = router