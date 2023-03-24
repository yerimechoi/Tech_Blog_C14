const { Post, User, Comments } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dashData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = dashData.map((post) => post.get({ plain: true }));

        console.log(posts)
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        // res.status(500).json(err);
        console.log(err);
        res.redirect('login')
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const dashData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User,
                attributes: ['username'],
            },
        })
        if (!dashData) {
            res.status(404).json.end();
        }

        const post = dashData.get({ plain: true });


        res.render('post', {
            post,
            username: post.username,
            loggedIn: req.session.loggedIn
        });
    } catch {
        res.status(500).json(err);
    }
});

module.exports = router;