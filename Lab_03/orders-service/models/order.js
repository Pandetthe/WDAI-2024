'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    bookId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'The bookId cannot be null.'
        },
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'The userId cannot be null.'
        },
      },
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'The amount cannot be null.'
        },
      },
    },
  }, {
    timestamps: true
  });
  return Order;
};