const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

// generates homepage 
router.get('/', (req, res) => {
    // console log the session variables
    console.log(req.session);
    // show the main.handlebars template along with all data 
    Blog.findAll({
        attributes: ['id', 'blog_url', 'title', 'created_at' ],
        include: [
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => {
        // loops over and serialize the entire array of blogs 
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        // pass the blogs object into the homepage template
        res.render('homepage', { 
          blogs,
          loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// generates login/signup page 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
    res.redirect('/');
    return;
    }
    res.render('login');
  });

// generates the single blog view 
router.get('/blog/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'blog_url',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogData => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }

      // serialize the data
      const blog = dbBlogData.get({ plain: true });

      // pass data to template
      res.render('single-blog', { 
        blog,
        loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;