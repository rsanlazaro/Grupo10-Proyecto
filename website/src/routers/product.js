const express = require('express');
const router = express.Router();

const productController= require('../controllers/productController');

//------------middlewares------
const authMid = require('../middlewares/authMid');
const validProductMid = require('../middlewares/validProductMid');
const multerMid = require('../middlewares/multerMid');

//---------se muestra lista de productos----------
router.get('/productList', productController.p_productList)

//----se muestra el formulario para agregar productos----------- 
router.get('/adminProductControl', authMid, productController.adminProductControl)

//---------se procesa el registro y se guarda el producto registrado-------
router.post('/newProduct', multerMid.single('product_image'), validProductMid, productController.productStore)

//---------para ver detalles y formulario para editar un producto----------
router.get('/adminEditProduct/:id', productController.adminEditproduct);

//------------Guardar cambios de los detalles del producto--------------------
router.put('/update/:id', multerMid.single('product_image'), validProductMid, productController.UpdateAdminEditproduct);

//------------Para eliminar un producto--------------------
router.delete('/delete/:id', productController.deleteProduct);

//------------Para ver detalles de producto como cliente--------------------
router.get('/productDetails/:id', productController.productDetails);

//------------agregar producto a carrito--------------------
router.get('/addtocart/:id', authMid, productController.addtoCart);

//------------vista de carrito--------------------
router.get('/cart/:id', authMid, productController.cartView);

//------------eliminar producto del carrito--------------------
router.get('/cart/delete/:id', productController.sacarItem);

module.exports = router;