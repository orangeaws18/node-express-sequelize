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

    static associate(models) {
        Tutorial.belongsToMany(models.Tag, {
            through: 'tutorial_tag',
            as: 'tags',
            foreignKey: 'tutorial_id'
        })
    }
}

module.exports = Tutorial