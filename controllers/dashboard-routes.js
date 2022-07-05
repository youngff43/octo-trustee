const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// GET /dashboard
router.get('/', withAuth, (req, res) => {
    Blog.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: ['id', 'content', 'title', 'created_at'],
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
        // serialize data before passing to template
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// generates the single blog edit view 
router.get('/edit/:id', withAuth, (req, res) => {
  Blog.findByPk(req.params.id, {
    attributes: [ 'id', 'content', 'title', 'created_at'],
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
      if (dbBlogData) {
        const blog = dbBlogData.get({ plain: true });
        
        res.render('edit-blog', {
          blog,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
  
module.exports = router;