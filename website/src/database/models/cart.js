module.exports = (sequalize,DataTypes) => {
    const alias = 'cart';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    };
    const config = {
        timestamps: false,
        tableName: 'carts'
    };

    const cart = sequalize.define(alias, cols, config);

    cart.associate = function (models) {
    }

    return cart;
};