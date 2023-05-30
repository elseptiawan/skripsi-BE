module.exports = (sequelize, Datatypes) => {
    const Category = sequelize.define('Category', {
        kategori_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nama: {
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
        tableName : 'categories',
    });
    Category.associate = function(models) {
        Category.hasMany(models.Restoran, {
            foreignKey: 'kategori_id',
            as: 'restorans'
        });
      }

    return Category;
}