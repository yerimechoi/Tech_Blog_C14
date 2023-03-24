// const router = require('express').Router();
// const { User, Post, Comments } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const commentData = await Comments.findAll({
//             include: [{
//                 model: Post,
//             }, 
//             {
//                 model: User,
//                 attributes: ['username'],
//             }]
//         });
//         if (!commentData) {
//             res.status(404).json.end();
//         }

//         const comment = commentData.get({ plain: true });

//         res.render('comment', {
//             comment,
//             username: comment.username
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.post('/', withAuth, async (req, res) => {
//     try {
//         const commentData = await Comments.create({
//             comment: req.body.comment,
//             user_id: req.session.user_id,
//             post_id: req.body.post_id,
//             createdAt: Date.now()
//         });

//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// module.exports = router;