module.exports = (sequelize, Datatypes) => {
    const Restoran = sequelize.define('Restoran', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          kategori_id: {
            type: Datatypes.INTEGER,
            allowNull: false
          },
          nama: {
            type: Datatypes.STRING,
            allowNull: false
          },
          kecamatan: {
            type: Datatypes.STRING,
            allowNull: false
          },
          alamat: {
            type: Datatypes.TEXT,
            allowNull: false
          },
          no_sertifikat: {
            type: Datatypes.STRING,
            allowNull: false
          },
          latitude: {
            type: Datatypes.STRING,
            allowNull: false
          },
          longtitude: {
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
        tableName : 'restorans',
    });
    Restoran.associate = function(models) {
        Restoran.belongsTo(models.Category, {
            foreignKey: 'kategori_id',
            as: 'category'
        });
    }

    return Restoran;
}