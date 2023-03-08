// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

const { Model, DataTypes, INTEGER, STRING } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      defaultValue: "...",
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
    }, 
    },
  {
    sequelize,
    createdAt: true,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogPost",
  }
);

module.exports = BlogPost;
