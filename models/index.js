const User = require('./user');
const Comment = require('./comment');
const BlogPost = require('./blogPost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

BlogPost.hasMany(Comment, {
  foreignKey: 'comment_id',
});

BlogPost.belongsTo(User,{
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPost_id'
})

module.exports = { User, BlogPost, Comment };