const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// generates homepage 
router.get('/', (req, res) => {
    // show the main.handlebars template along with all data 
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at' ],
        include: [
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData => {
        // loops over and serialize the entire array of posts 
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass the posts object into the homepage template
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// generates login/signup page 
router.get('/login', (req, res) => {
    res.render('login');
  });
  
module.exports = router;