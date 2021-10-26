module.exports = (sequelize, dataTypes) =>{
    let alias = "Products" // se estila poner nombre de modelo en plural

    let cols = {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER
      },
      category_id:{
        type: dataTypes.INTEGER,
        allowNull: false
      },
      productName:{
        type: dataTypes.STRING,
        allowNull: false
      },
      descriptionn:{
        type: dataTypes.TEXT,
        allowNull: false
      },
      price:{
        type: dataTypes.INTEGER,
        allowNull: false
      },
      quantity:{
        type: dataTypes.INTEGER,
        allowNull: false
      },
      product_image:{
        type: dataTypes.STRING,
        allowNull: false 
    }
     };

     let config = {
        tableName: "products",
        timestamps: false
      };

  const Product = sequelize.define(alias, cols, config);  

   Product.associate = function (models) {
    // Un producto le pertenece a una categoria
    Product.belongsTo(models.Categories, {
        foreignKey: 'category_id',
        as: 'product_category',
    });
  }
    return Product;
}    