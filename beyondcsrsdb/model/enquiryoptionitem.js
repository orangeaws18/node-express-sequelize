const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Enquiryoptionitem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            enquiryId: DataTypes.INTEGER,
            optionItemId: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Enquiryoptionitem',
            tableName: 'enquiryoptionitem',
            timestamps: false
        })
    }
}

module.exports = Enquiryoptionitem