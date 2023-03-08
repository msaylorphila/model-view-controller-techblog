const sequelize = require('../config/connection');
const BlogPost = require('../models/blogPost');
const blogPostData = require('./blogPostSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
