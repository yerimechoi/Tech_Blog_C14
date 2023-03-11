const { Post, User, Comments } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const homeData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comments,
                attributes: ['id', 'comment', 'user_id', 'post_id', 'date'],
            }],
        });

        const posts = homeData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const homeData = await Post.findOne({
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

        const post = homeData.get({ plain: true });

        res.render('singlepost', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch {
        res.status(500).json(err);
    }
});

router.get('/post/:id/comment', withAuth, async (req, res) => {
    try {
        const homeData = await Post.findOne({
            where: {
                user_id: req.session.user_id
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

        const posts = homeData.map((post) => post.get({ plain: true }));

        res.render('post-comment', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
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