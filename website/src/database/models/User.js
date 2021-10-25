module.exports = (sequelize, dataTypes) =>{
    let alias = "Users" // se estila poner nombre de modelo en plural y mayúscula
        
    let cols = {
    id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER
    },
    userName:{
        type: dataTypes.STRING,
        allowNull: false
    },
    id_rol:{
        type: dataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type: dataTypes.STRING,
        allowNull: false
    },
    passwordd:{
        type: dataTypes.STRING,
        allowNull: false
    },
    user_image:{
        type: dataTypes.STRING,
        allowNull: true 
    }
   };
   
   let config = {
        tableName: "users",
        timestamps: false
      };

  const User = sequelize.define(alias, cols, config);
//Relación
User.associate = function (models) {
  //un usuario le pertenece a muchos carritos
  User.belongsToMany(models.Carts, {
    as: "user_carritos",
    through: "user_carts",
    foreignKey: "user_id",
    otherKey: "products_id",
    timestamps: false,
  });

//  un usuario le pertenecen varios carritos
User.hasMany(models.User_carts, {
  as: "user_user_carts",
  foreignKey: "user_id",
 });
 
//  un usuario le pertenece un permiso 
   User.belongsTo(models.Permissions, {
    as: "user_permission",
    foreignKey: "id_rol",
   });
 }
    return User;
}    