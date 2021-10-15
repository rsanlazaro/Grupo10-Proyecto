const fs = require('fs');

const Cart = {
	fileName: './database-JSON/data-JSON/cart.json',
    

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allCarts = this.findAll();
		let lastCart = allCarts.pop();
		if (lastCart) {
			return lastCart.cartID + 1;
		} //si no hubiera ningún usuario retorna 1
		return 1;
	},

	findAll: function () {        
		return this.getData();
	},

	findByPk: function (cartID) { //by PrimaryKey
		let allCarts = this.findAll();
		let CartFound = allCarts.find(oneCart => oneCart.cartID == cartID);
		return CartFound;
	},
    
    findByField: function (field, text) {
		let allCarts = this.findAll();
		let cartFound = allCarts.find(oneCart => oneCart[field] === text);
		return cartFound;
	},

	create: function (cartData) {
		let allCarts = this.findAll();
		let newCart = {
			cartID: this.generateId(),
			...cartData
		}
		allCarts.push(newCart); //insertar producto
		fs.writeFileSync(this.fileName, JSON.stringify(allCarts, null,  ' '));
		return newCart;
	},
	
	delete: function (cartID) {
		let allCarts = this.findAll();
		let finalCarts = allCarts.filter(oneCart => oneCart.cartID !== cartID);
		fs.writeFileSync(this.fileName, JSON.stringify(finalCarts, null, ' '));
		return true;
	},
	update: function (cart) {
        let carts = this.findAll();

        let updatedCarts = carts.map(currentCart => {
            if (currentCart.cartID == cart.cartID) {
                return currentCart = cart;
            }
            return currentCart;
        });
        
		fs.writeFileSync(this.fileName, JSON.stringify(updatedCarts, null,  ' '));
		return cart.cartID
    }
}

module.exports = Cart;



