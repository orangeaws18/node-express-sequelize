const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Task extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            taskName: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: 'Task',
            tableName: 'task',
            timestamps: false
        });
    }

    static associate(models) {
        Task.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }
}

module.exports = Task