const Sequelize = require("sequelize");
const Tutorial = require('./model/tutorial');
const User = require('./model/user');
const Task = require('./model/task');

const sequelize = new Sequelize('orange', 'db_admin', 'beyondcars123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const models = {
    Tutorial: Tutorial.init(sequelize),
    User: User.init(sequelize),
    Task: Task.init(sequelize)
}

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

db.models = models

module.exports = db