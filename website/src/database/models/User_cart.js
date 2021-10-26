module.exports = (sequelize, dataTypes) =>{
    let alias = "User_carts" //se estila poner nombre de modelo en plural

    let cols = {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    products_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },
    user_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },
    cart_status:{
        type: dataTypes.STRING,
        allowNull: false
    }
   };
   
   let config = {
        tableName: "user_carts",
        timestamps: false
      };

    const User_cart = sequelize.define(alias, cols, config);
    
    //Relación
User_cart.associate = function (models) {

  //  un usuario user_carts le pertenece a un usuario
     User_cart.belongsTo(models.Users, {
      as: "user_carts_user",
      foreignKey: "user_id",
     });
   }

    return User_cart;
}    