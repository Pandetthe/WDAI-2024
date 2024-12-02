'use strict';

const { Book } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (_queryInterface, _Sequelize) {
    return Book.bulkCreate([
      {
        title: 'Book A',
        author: 'Author C',
        year: '1999',
      },
      {
        title: 'Book B',
        author: 'Author B',
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
