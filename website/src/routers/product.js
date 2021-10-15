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
router.post('/newProduct', multerMid.single('image'), validProductMid, productController.productStore)

//---------para ver detalles y formulario para editar un producto----------
router.get('/adminEditProduct/:productID', productController.adminEditproduct);

//------------Guardar cambios de los detalles del producto--------------------
router.put('/update/:productID', multerMid.single('image'), validProductMid, productController.UpdateAdminEditproduct);

//------------Para eliminar un producto--------------------
router.delete('/delete/:productID', productController.deleteProduct);

//------------Para ver detalles de producto como cliente--------------------
router.get('/productDetails/:productID', productController.productDetails);

//------------agregar producto a carrito--------------------
router.get('/addtocart/:productID', authMid, productController.addtoCart);

//------------vista de carrito--------------------
router.get('/cart/:cartID', authMid, productController.cartView);

//------------eliminar producto del carrito--------------------
router.get('/cart/delete/:productID', productController.sacarItem);

module.exports = router;