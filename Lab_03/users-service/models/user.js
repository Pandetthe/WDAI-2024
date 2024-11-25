'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address.',
        },
        notNull: {
          msg: 'The email cannot be null.',
        },
        notEmpty: {
          msg: 'The email cannot be an empty string.',
        },
      },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  
        notNull: {
          msg: 'The password cannot be null.'
        },
        notEmpty: {
          msg: 'The password cannot be an empty.'
        },
        is: {
          args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/,
          msg: 'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number.',
        },
      },
    },
  }, {
    timestamps: true
  });

  User.afterValidate(async (user, _options ) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  return User;
};