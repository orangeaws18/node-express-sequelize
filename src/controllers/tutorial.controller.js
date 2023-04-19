const db = require('../../db');

const Tutorial = db.models.Tutorial;

exports.create = (req, res) => {

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        })
}

exports.findAll = (req, res) => {

    const condition = null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
}