const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Chartitems extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            desc: DataTypes.STRING,
            value: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Chartitems',
            tableName: 'chartitems',
        })
    }
}

module.exports = Chartitems