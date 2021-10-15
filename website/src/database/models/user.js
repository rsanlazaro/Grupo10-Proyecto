module.exports = (sequalize,DataTypes) => {
    const alias = 'user';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        permits_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        passwordConfirmation: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_id: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    };
    const config = {
        timestamps: false,
        tableName: 'users'
    };

    const user = sequalize.define(alias, cols, config);

    user.associate = function (models) {
     
    }

    return user;
};