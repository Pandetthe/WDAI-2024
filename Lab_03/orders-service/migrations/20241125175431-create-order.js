'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'users_id_fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Orders', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'books_id_fk',
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};