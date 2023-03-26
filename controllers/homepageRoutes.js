const { Post, User, Comments } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const homeData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }]
        });

        const posts = homeData.map((post) => post.get({
            plain: true
        }));

        console.log(posts)
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
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comments,
                include: [{
                    model: User,
                    attributes: ['username']
                }],
                attributes: ['id',
                    'comment',
                    'user_id',
                    'post_id',
                    'createdAt'],
            }],
        });

        const post = homeData.get({
            plain: true
        });

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/post/:id/comment', withAuth, async (req, res) => {

    try {
        const homeData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username']
            }],
        });

        const post = homeData.get({
            plain: true
        });


        const commentData = await Comments.findAll({
            where: {
                post_id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        const comments = commentData.map((comment) => comment.get({
            plain: true
        }));
        console.log(post)
        console.log(comments)

        res.render('comment', {
            post,
            comments
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


router.get('/create', withAuth, (req, res) => {
    res.render('create');
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