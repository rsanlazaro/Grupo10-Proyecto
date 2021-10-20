module.exports = (sequelize, dataTypes) =>{
    let alias = "Users" // se estila poner nombre de modelo en plural
    //alias, cols, config
    const User = sequelize.define('Users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    nombre:{

    } });
    return User;
}