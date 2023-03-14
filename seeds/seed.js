const sequlize = require('../config/connection');
const { User, Post, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
    await sequlize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    };

    for (const comments of commentsData) {
        await Comments.create({
            ...comments,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    };

    process.exit(0);
}

seedDatabase();