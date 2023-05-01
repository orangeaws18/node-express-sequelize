const express = require("express");
const db = require('../../db');

const Tag = db.models.Tag;

const router = express.Router();

router.post("/", (req, res, next) => {
    const tag = {
        name: req.body.name,
    };

    Tag.create(tag)
        .then(data => {
            res.send(data)
        })
})

router.get("/", (req, res, next) => {
    const condition = null;

    Tag.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
})

router.get("/:tagId", (req, res, next) => {
    Tag.findByPk(req.params.tagId)
        .then(data => {
            res.send(data)

        })
})

module.exports = router