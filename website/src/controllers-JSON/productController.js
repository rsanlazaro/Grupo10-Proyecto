const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');

const Product = require('../database-JSON/Modelos-JSON/Product.js')
const Cart = require('../database-JSON/Modelos-JSON/Cart.js')


let productController = {
    p_productList: (req,res)=>{
       return res.render('product/productList',{ products: Product.getData()})
    },
    adminProductControl: (req,res)=>{
       return res.render('product/adminProductControl', { items: Product.getData()})
     },
    productStore: (req,res)=>{

    const productValidation = validationResult(req);

    if(productValidation.errors.length>0){
       return  res.render('product/adminProductControl', {
         productErrors: productValidation.mapped(),
         oldData: req.body,
         items: Product.getData()
      });
    }
   
    let productToCreate = {
       name: req.body.name,
       category: req.body.category,
       price: req.body.price,
       quantity: req.body.quantity,
       description: req.body.description,
       productImage: req.file.filename
    }
       let productCreated = Product.create(productToCreate);
       return  res.render('product/adminProductControl', {
         oldData: req.body,
         msg: true,
         items: Product.getData()
       });
  },
  adminEditproduct: (req,res)=>{
      res.render('product/adminEditProduct',{item: Product.findByPk(req.params.productID)});
  },
  UpdateAdminEditproduct: (req,res)=>{
   
    const productValidation = validationResult(req);

    if(productValidation.errors.length>0){
       return  res.render('product/adminProductControl', {
         productErrors: productValidation.mapped(),
         oldData: req.body,
         items: Product.getData()
      });
    }
     
    Product.update(
      {
        productID: parseInt(req.params.productID),
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        productImage: req.file.filename
     }
);

     return res.render('product/adminProductControl', {
      oldData: req.body,
      msg: true,
      items:  Product.getData()
    });
  },
  

  deleteProduct: (req,res)=>{  
    fs.unlink(path.resolve('../public/assets/img/products/'+Product.findByPk(req.params.productID).productImage), (err) => {
      if (err) {
          console.log("failed to delete local image:"+ err);
      } else {
          console.log('successfully deleted local image');  }
      });

      Product.delete(parseInt(req.params.productID))
      return res.render('product/adminProductControl', {
      items:  Product.getData()
    });
  },
  productDetails: (req,res)=>{
    return res.render('product/productDetails',{item: Product.findByPk(req.params.productID)})
  },
  cartView: (req,res)=>{
    let carrito = Cart.findByField("cartID", parseInt(req.params.cartID))
    let products= []  
  
    if(carrito == undefined){
         return res.render('product/cart',{ products: products, 
         totalprice:  0 })

       }else if(carrito.status == "enProceso"){
         carrito.productsID.forEach(productID=>{
         products.push(Product.findByPk(productID))})
         return res.render('product/cart',{ products: products, 
         totalprice: products.map(product => parseInt(product.price)).reduce((a,b)=>a+b)
      })
    }   
  },

  addtoCart: (req,res)=>{
    let carrito = Cart.findByField("userID", req.session.userLogged.id)
  
    if(carrito == undefined){
        carrito = Cart.create({
        productsID: [],
        userID: req.session.userLogged.id,
        status: "enProceso" });
    }
    carrito.productsID.push(req.params.productID)
    Cart.update(carrito)

    let products = [] 
    
    if(carrito.status == "enProceso"){
        carrito.productsID.forEach(productID=>{
        products.push(Product.findByPk(productID))})
        return res.render('product/cart',{ products: products, 
           totalprice: products.map(product => parseInt(product.price)).reduce((a,b)=>a+b),
           itemsCount: carrito.productsID.length //se actualiza
        })
      }   
    },
  
    sacarItem:(req,res)=>{
    let carrito = Cart.findByField("userID", req.session.userLogged.id)
    index = carrito.productsID.findIndex(element => element == parseInt(req.params.productID))
    //si son muchos con ese index elimina el primero
    if (index > -1) {
     carrito.productsID.splice(index, 1);
    }
    Cart.update(carrito)
    let products = [] 

    if(carrito.status == "enProceso"){
     carrito.productsID.forEach(productID=>{
     products.push(Product.findByPk(productID))})
      return res.render('product/cart',{ products: products, 
        totalprice: products.map(product => parseInt(product.price)).reduce((a,b)=>a+b),
        itemsCount: carrito.productsID.length //se actualiza
      })
    }   
  }
}

module.exports = productController;

