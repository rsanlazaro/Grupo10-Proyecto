
module.exports = (sequelize, dataTypes) =>{

  let alias = "Categories" //se estila poner nombre de modelo en plural
   
   let cols ={
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    category:{
        type: dataTypes.ENUM('tazas', 'termos', 'gorras', 'playeras', 'llaveros', 'rompecabezas', 'especiales'),
        allowNull: false
    }
   };

   let config = {
        tableName: "categories",
        timestamps: false
      };

  const Category = sequelize.define(alias, cols, config);
   

 //Relacion   
 Category.associate = function (models) {
    // Una categoria le pertenece a muchos productos
    Category.hasMany(models.Products, {
      foreignKey: 'category_id',
      as: 'category_product'
   });
}
  
    return Category;
};    