'use strict';
module.exports = function(sequelize, DataTypes) {
  var todos = sequelize.define('todos', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    priority: DataTypes.INTEGER,
    completed_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todos;
};