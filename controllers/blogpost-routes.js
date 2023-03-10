const { json } = require('sequelize');
const { BlogPost, User, Comment } = require('../models');
const router = require('express').Router();

////get a single blogpost
router.get('/:id', async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findOne({
        where: {
          id: req.params.id
        },
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
                'user_id',
                'contents',
                'blogpost_id',
                'createdAt'],
                
                  include: {
                     model: User,
                      attributes: [
                        'username',
                        'id'
                      ]}
           
            }
       ]
    })
        // const comments = await Comment.findAll({
        //   where: {
        //     blogpost_id: req.params.id
        //   },
        //   include: { model: User,
        //     attributes: [
        //       'id',
        //       'username'
        //     ]
        //   }
        // });
        let loggedIn = req.session.loggedIn
      const blogPost = dbBlogPostData.get({ plain: true });
      // const comments = commentData.get({ plain: true })
      // console.log(comments)
      console.log(blogPost)
      if (loggedIn){
        res.render('blogPost', { blogPost, loggedIn: req.session.loggedIn });
      } else {
        res.redirect('/login')
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

/////comment on a blogpost
  router.post('/:id', async (req, res) => {
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
                'user_id',
                'contents'
              ],
            }
          ],})
          const newComment = await Comment.create({
            contents: req.body.contents,
            user_id: req.session.user_id,
            blogpost_id: req.params.id
          })
          console.log(newComment)
          if (newComment.contents && newComment.user_id && newComment.blogpost_id) {
            return res.status(200).json(newComment);
          } else {
            console.log('something is wrong')
          }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  ////create a new blogpost 
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