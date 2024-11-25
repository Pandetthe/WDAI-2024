'use strict';

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'The title cannot be null.'
        },
        notEmpty: {
          msg: 'The title cannot be an empty.'
        },
      },
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'The author cannot be null.'
        },
        notEmpty: {
          msg: 'The author cannot be an empty.'
        },
      },
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'The year cannot be null.'
        },
      },
    },
  }, {
    timestamps: true
  });
  return Book;
};