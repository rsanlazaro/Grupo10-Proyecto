module.exports = (sequelize, dataTypes) =>{
    let alias = "Permissions" //se estila poner nombre de modelo en plural
    //alias, cols, config
    let cols = {
       id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
      },
      rol:{
        type: dataTypes.STRING,
        allowNull: false
       }
      }; 

      let config = {
        tableName: "permissions",
        timestamps: false
      };

      const Permission = sequelize.define(alias, cols, config);
        
//Relacion
Permission.associate = function (models) {
  //un permiso puede pertenecer a muchos usuarios  
   Permission.hasMany(models.Users, {
      as: "Permission-usuario",
      foreignKey: "id_rol",
    });
  };
  

    return Permission;
}    
