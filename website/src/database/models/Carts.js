module.exports = (sequelize, dataTypes) =>{
    let alias = "Carts" //se estila poner nombre de modelo en plural

    let cols = {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    product_carts_id:{
        type: dataTypes.STRING,
        allowNull: true
    }
   };
   
   let config = {
        tableName: "carts",
        timestamps: false
      };

    const User_cart = sequelize.define(alias, cols, config);
    
    //Relación
    //  Cart.associate = function (models) {}
      
    
    return User_cart;
}    