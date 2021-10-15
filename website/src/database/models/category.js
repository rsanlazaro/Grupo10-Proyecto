module.exports = (sequalize,DataTypes) => {
    const alias = 'category';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    };
    const config = {
        timestamps: false,
        tableName: 'categories'
    };

    const category = sequalize.define(alias, cols, config);

    category.associate = function (models) {
        
    }

    return category;
};