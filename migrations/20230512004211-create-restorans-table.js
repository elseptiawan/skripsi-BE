'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('restorans', 
    { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      kategori_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      no_sertifikat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: false
      },
      longtitude: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('restorans');
  }
};
