module.exports = (sequalize,DataTypes) => {
    const alias = 'discount';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT(24),
            allowNull: false,
        }
    };
    const config = {
        timestamps: false,
        tableName: 'discounts'
    };

    const discount = sequalize.define(alias, cols, config);

  discount.associate = function (models) {
  
    }

    return discount;
};