module.exports = (sequalize,DataTypes) => {
    const alias = 'permit';
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        permitsType: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_permits: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    };
    const config = {
        timestamps: false,
        tableName: 'permits'
    };

    const permit = sequalize.define(alias, cols, config);

    permit.associate = function (models) {
        
    }

    return permit;
};