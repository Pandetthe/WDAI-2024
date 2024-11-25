'use strict';

const { Book } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (_queryInterface, _Sequelize) {
    return Book.bulkCreate([
      {
        title: 'Really weird book',
        author: 'Nobody knows',
        year: '1999',
      },
      {
        title: 'Weirder stupid book',
        author: 'Joe',
        year: '1969',
      },
    ], {
      validate: true,
      individualHooks: true
    });
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Books', {});
  }
};
