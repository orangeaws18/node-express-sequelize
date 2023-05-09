const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Userdata extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            isEnable: DataTypes.BOOLEAN,
            email: DataTypes.STRING,
            groupId: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Userdata',
            tableName: 'userdata',
            timestamps: false
        })
    }
}

module.exports = Userdata