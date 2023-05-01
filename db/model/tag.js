const Sequelize = require("sequelize");

const DataTypes = Sequelize.DataTypes;

class Tag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING
            },
        }, {
            sequelize,
            modelName: 'Tag',
            tableName: 'tag',
            timestamps: false
        });
    }

    static associate(models) {
        Tag.belongsToMany(models.Tutorial, {
            through: 'tutorial_tag',
            as: 'tutorials',
            foreignKey: 'tag_id'
        })
    }
}

module.exports = Tag