module.exports = (sequalize,DataTypes) => {
    const alias = 'orderDetail';
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
        cart_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        payment_id: {
            type: DataTypes.ENUM,
            allowNull: false
        },
        datePurchase: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    };
    const config = {
        timestamps: false,
        tableName: 'orderDetails'
    };

    const orderDetail = sequalize.define(alias, cols, config);
    orderDetail.associate = function (models) {
    }

    return orderDetail;
};