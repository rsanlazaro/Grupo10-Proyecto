module.exports = (sequalize,DataTypes) => {
    const alias = 'image';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    };
    const config = {
        timestamps: false,
        tableName: 'images'
    };

    const image = sequalize.define(alias, cols, config);

    image.associate = function (models) {
    }

    return image;
};