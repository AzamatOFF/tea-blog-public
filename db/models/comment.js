'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'postId' });
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Comment.init(
    {
      body: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
