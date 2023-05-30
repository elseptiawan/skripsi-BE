module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          email: {
            type: Datatypes.STRING,
            allowNull: false
          },
          password: {
            type: Datatypes.STRING,
            allowNull: false
          },
          createdAt: {
            type: Datatypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Datatypes.DATE,
            allowNull: false
          },
    }, {
        sequelize, 
        modelName: 'User',
        tableName : 'users',
        defaultScope: {
            attributes: {
            exclude: ['password']
            }
        },
        scopes: {
            withPassword: {
            attributes: {
                include: ['password']
            }
            }
        }
    });

    return User;
}