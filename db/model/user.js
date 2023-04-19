const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            firstName: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: false
        });
    }

    static associate(models) {
        User.hasMany(models.Task, { as: 'tasks', foreignKey: 'user_id'})
    }
}

module.exports = User