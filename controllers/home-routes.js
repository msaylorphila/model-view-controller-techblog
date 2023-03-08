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
      const blogPostData = await BlogPost.findAll({ include: {model: User}})
      
      const blogPosts = blogPostData.map((blogPost) =>
        blogPost.get({ plain: true })
      );
      console.log(blogPosts)
      res.render('homepage', {
        blogPosts,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get('/blogpost/:id', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findByPk(req.params.id);
  
      const blogpost = dbPaintingData.get({ plain: true });
  
      res.render('painting', { painting });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
module.exports = router