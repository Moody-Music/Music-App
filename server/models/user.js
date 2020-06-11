'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model { }
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please do not leave email empty'},
        notNull: { msg: 'Please do not leave email null'},
        duplicateEmail(input){
          return User.findOne({ where: { email: input } })
          .then( response => {
            if (response) {
              throw new Error('Email has already taken.')
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please do not leave password empty'},
        notNull: { msg: 'Please do not leave password null'}
      }
    }
    
  }, { sequelize });

  User.addHook('beforeCreate', (user, options) => {
    user.password = bcrypt.hashSync(user.password, saltRounds)
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};