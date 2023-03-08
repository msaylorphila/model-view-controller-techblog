const { BlogPost, User } = require('../models');

const router = require('express').Router();
// const { User, Comment, BlogPost } = require('/models/index');

// router.get('/', async (req, res) => {
//     try {
//        res.render('homepage', {name: 'Marg'}) 
//     } catch(err) {
//         console.log('you messed up')
//     }
// });

router.get('/login', async (req, res) => {
    try {
       res.render('login') 
    } catch(err) {
        console.log('you messed up')
    }
});

router.get('/', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findAll({ include: {model: User}})
      
  
      const blogPosts = dbBlogPostData.map((blogPost) =>
        blogPost.get({ plain: true })
      );
      console.log(blogPosts)
      res.render('homepage', {
        blogPosts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  


module.exports = router