const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Optionitems extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            value: DataTypes.STRING,
            subValue: DataTypes.STRING,
            isEnable: DataTypes.BOOLEAN,
            order: DataTypes.INTEGER,
            titleId: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Optionitems',
            tableName: 'optionitems',
            timestamps: false
        })
    }
}

module.exports = Optionitems