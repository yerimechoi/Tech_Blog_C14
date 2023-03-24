const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
            createdAt: Date.now()
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            where: {
                id: req.params.id
            },
            include: {
                model: Post,
                attributes: ['post_id'],
            },
        });
        if (!commentData) {
            res.status(404).json.end();
        }

        const comment = commentData.get({ plain: true });

        res.render(':id/comment', {
            comment,
            username: comment.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            createdAt: Date.now()
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;