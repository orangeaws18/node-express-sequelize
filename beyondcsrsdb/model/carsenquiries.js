const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Carsenquiries extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            carDate: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'Carsenquiries',
            tableName: 'carsenquiries',
            timestamps: false
        })
    }
}

module.exports = Carsenquiries