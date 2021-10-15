const fs = require('fs');

const User = {
	fileName: './database-JSON/data-JSON/users.json',
    

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		} //si no hubiera ningún usuario retorna 1
		return 1;
	},

	findAll: function () {        
		return this.getData();
	},

	findByPk: function (id) { //by PrimaryKey
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData,
            role: (userData.email == "aleguamen_@hotmail.com"|| userData.email == "rsanlazaro@hotmail.com")? "administrador": "cliente",
            imagen: null
		}
		allUsers.push(newUser); //insertar usuario
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	},
	update: function (user) {
        let users = this.findAll();

        let updatedUsers = users.map(currentUser => {
            if (currentUser.id == user.id) {
                return currentUser = user;
            }
            return currentUser;
        });
        
		fs.writeFileSync(this.fileName, JSON.stringify(updatedUsers, null,  ' '));
    }
}

module.exports = User;
