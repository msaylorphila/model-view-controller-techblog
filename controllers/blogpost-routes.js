const { BlogPost, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
            {
                model: User, 
               attributes: [
                'id',
                'username'
            ]},
            {
              model: Comment,
              attributes: [
                'id',
                'user_id'
              ],
            }
          ],
        });
        let loggedIn = req.session.loggedIn
      const blogPost = dbBlogPostData.get({ plain: true });
      if (loggedIn){
        res.render('blogPost', { blogPost, loggedIn: req.session.loggedIn });
      } else {
        res.render('login')
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newBlog = await BlogPost.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
      })
      console.log(newBlog)
      if (newBlog.title && newBlog.contents && newBlog.user_id) {
        return res.status(200).json(newBlog);
      } else {
        console.log('something is wrong')
      }
    } catch (err) {
      res.status(err)
    }
  })

  module.exports = router