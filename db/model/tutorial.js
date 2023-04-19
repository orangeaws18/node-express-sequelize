const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Tutorial extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            published: {
                type: DataTypes.BOOLEAN
            }
        }, {
            sequelize,
            modelName: 'Tutorial',
            tableName: 'tutorial',
            timestamps: false
        });
    }
}

module.exports = Tutorial