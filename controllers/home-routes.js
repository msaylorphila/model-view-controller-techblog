const { BlogPost, User, Comment } = require("../models");

const router = require("express").Router();
// const { User, Comment, BlogPost } = require('/models/index');

// router.get('/', async (req, res) => {
//     try {
//        res.render('homepage', {name: 'Marg'})
//     } catch(err) {
//         console.log('you messed up')
//     }
// });

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("you messed up");
  }
});

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: { model: User, attributes: ["id", "username"] },
    });

    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    // console.log(blogPosts);
    res.render("homepage", {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get('/dashboard', async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id
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
    // console.log(myBlogs)
    // console.log(req.session.id)
    // const myblogPosts = myBlogs.map((blogPost) =>
    // blogPost.get({ plain: true }))
    // console.log(myblogPosts)
    const myBlogs = dbBlogPostData.map((blogPost) =>
    blogPost.get({ plain: true }))
    console.log(myBlogs);
  ;    let loggedIn = req.session.loggedIn;
    if (loggedIn) {
      res.render("dashboard", {
        myBlogs,
        loggedIn: req.session.loggedIn
      });
      return;
    } else {
    res.render('login')}
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
