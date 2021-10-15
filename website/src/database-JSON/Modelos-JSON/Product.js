const fs = require('fs');

const Product = {
	fileName: './database-JSON/data-JSON/products.json',
    

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allProducts = this.findAll();
		let lastProduct = allProducts.pop();
		if (lastProduct) {
			return lastProduct.productID + 1;
		} //si no hubiera ningún usuario retorna 1
		return 1;
	},

	findAll: function () {        
		return this.getData();
	},

	findByPk: function (productID) { //by PrimaryKey
		let allProducts = this.findAll();
		let productFound = allProducts.find(oneProduct => oneProduct.productID == productID);
		return productFound;
	},

	findByField: function (field, text) {
		let allProducts = this.findAll();
		let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
		return productFound;
	},

	create: function (userData) {
		let allProducts = this.findAll();
		let newProduct = {
			productID: this.generateId(),
			...userData
		}
		allProducts.push(newProduct); //insertar producto
		fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null,  ' '));
		return newProduct;
	},
	
	delete: function (productID) {
		let allProducts = this.findAll();
		let finalProducts = allProducts.filter(oneProduct => oneProduct.productID !== productID);
		fs.writeFileSync(this.fileName, JSON.stringify(finalProducts, null, ' '));
		return true;
	},
	update: function (product) {
        let products = this.findAll();

        let updatedProducts = products.map(currentProduct => {
            if (currentProduct.productID == product.productID) {
                return currentProduct = product;
            }
            return currentProduct;
        });
        
		fs.writeFileSync(this.fileName, JSON.stringify(updatedProducts, null,  ' '));
		return product.productID
    }
}

module.exports = Product;

