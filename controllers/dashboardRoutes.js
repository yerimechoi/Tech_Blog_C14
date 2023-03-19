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
        });

        const posts = dashData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const dashData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'date',
            ],
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comments,
                attributes: ['id', 'comment', 'user_id', 'post_id', 'date'],
            }],
        });

        if (!dashData) {
            res.status(404).json.end();
        }
        const post = dashData.get({ plain: true });

        res.render('comment', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch {
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

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;