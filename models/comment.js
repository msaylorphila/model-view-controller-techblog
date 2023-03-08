// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

const { Model, DataTypes, INTEGER, STRING } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
            references: {
              model: 'user',
              key: 'id',
            },
    },
    blogPost_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blogPost',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    createdAt: true,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
