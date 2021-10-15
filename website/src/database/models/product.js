module.exports = (sequalize,DataTypes) => {
    const alias = 'product';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ProductName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_id: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    };
    const config = {
        timestamps: false,
        tableName: 'products'
    };

    const product = sequalize.define(alias, cols, config);

    product.associate = function (models) {
        
    }

    return product;
};