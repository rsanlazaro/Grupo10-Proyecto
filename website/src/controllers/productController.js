const { validationResult } = require("express-validator");
let db = require("../database/models");
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const sequelize = db.sequelize;


let productController = {
    p_productList: (req,res)=>{
        db.Products.findAll({include: 
          [{association: "product_category"}]}).then(products => {
        return res.render('product/productList', { products: products})
    })
  },
    adminProductControl: (req,res)=>{
       db.Products.findAll({include: 
        [{association: "product_category"}]}).then(products => {
      return res.render('product/adminProductControl', { items: products})
      })
     },
    
     productStore: async (req,res)=>{

    const productValidation = validationResult(req);

    if(productValidation.errors.length>0){
     
      await db.Products.findAll({include: 
        [{association: "product_category"}]}).then(products => {
        return res.render('product/adminProductControl', { 
          productErrors: productValidation.mapped(),
          oldData: req.body,      
          items: products})
      })
    }
    
    let categories = ['tazas', 'termos', 'gorras', 'playeras', 'llaveros', 'rompecabezas', 'especiales'];
    let category_id = categories.indexOf(req.body.category)+1

     await db.Products.create({
       productName: req.body.productName,
       category_id: category_id,
       price: req.body.price,
       quantity: req.body.quantity,
       descriptionn: req.body.descriptionn,
       product_image: req.file.filename
      })
   
      await db.Products.findAll({include: 
        [{association: "product_category"}]}).then(products => {
        return res.render('product/adminProductControl', { 
          oldData: req.body,
          msg: true,
          items: products})
      })
  },
  
  adminEditproduct: (req,res)=>{
      db.Products.findOne({
      where: { id: req.params.id },
      include: [{association: "product_category"}]
    }).then(item=>{
      return res.render('product/adminEditProduct',{item: item})
    })

  },
  UpdateAdminEditproduct: async (req,res)=>{

    const productValidation = validationResult(req);

    if(productValidation.errors.length>0){
     
      await db.Products.findAll({include: 
        [{association: "product_category"}]}).then(products => {
        return res.render('product/adminProductControl', { 
          productErrors: productValidation.mapped(),
          oldData: req.body,      
          items: products})
      })
    }
    let categories = ['tazas', 'termos', 'gorras', 'playeras', 'llaveros', 'rompecabezas', 'especiales'];
    let category_id = categories.indexOf(req.body.category)+1


    await db.Products.update({
			 productName: req.body.productName,
       category_id: category_id,
       price: req.body.price,
       quantity: req.body.quantity,
       descriptionn: req.body.descriptionn,
       product_image: req.file.filename
      },{
		   where: {id: req.params.id} 
	   })
     
    
     await db.Products.findAll({include: 
      [{association: "product_category"}]}).then(products => {
      return res.render('product/adminProductControl', { 
        oldData: req.body,
        msg: true,
        items: products})
    })
  },
  
  deleteProduct: async(req,res)=>{  
    let product = await db.Products.findOne({
      where: { id: req.params.id },
      include: [{association: "product_category"}]
    })
    
    fs.unlink(path.resolve('../public/assets/img/products/'+product.dataValues.product_image), (err) => {
      if (err) {
          console.log("failed to delete local image:"+ err);
      } else {
          console.log('successfully deleted local image');  }
      });
     
      await db.Products.destroy({
        where: { id: req.params.id }
      })
     
      await db.Products.findAll({include: 
        [{association: "product_category"}]}).then(products => {
        return res.render('product/adminProductControl', { items: products})
      })
    
  },

  productDetails: (req,res)=>{
    db.Products.findOne({
      where: { id: req.params.id },
      include: [{association: "product_category"}]
    }).then(item=>{
       return res.render('product/productDetails',{item: item})
    })
    
  },

  cartView: async(req,res)=>{

    let carrito = await  db.Users.findAll({
      where: { id: req.session.userLogged.id},
      include: [{association: "user_carritos"},
                {association: "user_user_carts", attributes: ['products_id', 'cart_status'], where:{cart_status: "enproceso"}}]
    }) 
    let indice = carrito[0].dataValues.user_user_carts[0].dataValues.products_id
    
    let products = carrito[0].dataValues.user_carritos[indice-1].dataValues.product_carts_id
    
    if(products.length>1){
      products = products.split(",");
      var arrayOfIds = products.map(Number);
      arrayOfIds.shift()//eliminar primer elemento productID default 0
  console.log(arrayOfIds)
      products= [];
      for (const productID of arrayOfIds) {
        var items= await db.Products.findOne({where:{ id: productID}});
        products.push(items.dataValues)
      }

      return res.render('product/cart',{ products: products, 
       totalprice:'$'+ String(products.map(product => parseInt(product.price)).reduce((a,b)=>a+b)),
       itemsCount: arrayOfIds.length //se actualiza
       })
     }else{
      return res.render('product/cart',{ products: [], 
        totalprice: parseInt(products) })
    }
  },

  addtoCart: async (req,res)=>{
    
    let carrito = await  db.Users.findAll({
      where: { id: req.session.userLogged.id},
      include: [{association: "user_carritos"},
                {association: "user_user_carts", attributes: ['products_id', 'cart_status'], where:{cart_status: "enproceso"}}]
    }) 
    let indice = carrito[0].dataValues.user_user_carts[0].dataValues.products_id

    let products = carrito[0].dataValues.user_carritos[indice-1].dataValues.product_carts_id
     
    await db.Carts.update({
      product_carts_id : (products + ',' + String(req.params.id))
     },{
      where: {id: indice} 
    })
      
    if(products.length>1){
      products = products.split(",");
      var arrayOfIds = products.map(Number);
      arrayOfIds.push(parseInt(req.params.id))
    }else{
      var arrayOfIds = [parseInt(products) , parseInt(req.params.id)]
    }
   
  arrayOfIds.shift()
  
products= [];
for (const productID of arrayOfIds) {
   var items= await db.Products.findOne({where:{ id: productID}});
   products.push(items.dataValues)
}

return res.render('product/cart',{ products: products, 
  totalprice:'$'+ String(products.map(product => parseInt(product.price)).reduce((a,b)=>a+b)),
  itemsCount: arrayOfIds.length //se actualiza
})

    },
  
    sacarItem:async (req,res)=>{
      let carrito = await db.Users.findAll({
        where: { id: req.session.userLogged.id},
        include: [{association: "user_carritos"},
                  {association: "user_user_carts", attributes: ['products_id', 'cart_status'], where:{cart_status: "enproceso"}}]
      }) 
      let indice = carrito[0].dataValues.user_user_carts[0].dataValues.products_id
  
      let products = carrito[0].dataValues.user_carritos[0].dataValues.product_carts_id
    
      if(products.length>1){//obtengo los productos ID sin agregar otro ID 
        products = products.split(",");
        var arrayOfIds = products.map(Number); 
      }else{
        var arrayOfIds = [parseInt(products)] 
      }
    
    index = arrayOfIds.findIndex(element => element == parseInt(req.params.id))
    //si son muchos con ese index elimina el primero elemento igual al productID
    if (index > -1) {
     arrayOfIds.splice(index, 1);
    }
    
    await db.Carts.update({
      product_carts_id : String(arrayOfIds)
     },{
      where: {id: indice} 
    })
    arrayOfIds.shift() //eliminar el primer productID default O 
    products= [];
    
    for (const productID of arrayOfIds) {
       var items= await db.Products.findOne({where:{ id: productID}});
       products.push(items.dataValues)
    }

    return res.render('product/cart',{ products: products, 
      totalprice:'$'+ String(products.map(product => parseInt(product.price)).reduce((a,b)=>a+b)),
      itemsCount: arrayOfIds.length //se actualiza
      })
  }
}

module.exports = productController;


