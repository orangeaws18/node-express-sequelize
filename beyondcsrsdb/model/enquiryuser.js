const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Enquiryuser extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: DataTypes.INTEGER,
            enquiryId: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Enquiryuser',
            tableName: 'enquiryuser',
            timestamps: false
        })
    }
}

module.exports = Enquiryuser