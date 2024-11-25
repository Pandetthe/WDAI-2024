'use strict';

const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (_queryInterface, _Sequelize) {
    return User.bulkCreate([
      {
        email: 'john@gmail.com',
        password: 'Doe12345!',
      },
      {
        email: 'admin@super.tech',
        password: 'Admin@12',
      },
    ], {
      validate: true,
      individualHooks: true
    });
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Users', {});
  }
};
