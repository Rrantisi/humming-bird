const User = require('../models/user');
const Post = require('../models/post');

async function show(req, res) {
    try {
        const userId = req.params.userId;
        const foundUser = await User.findById(userId);
        res.render('users/show', {
            title: 'User Details',
            user: foundUser,
        })
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}

module.exports = {
    show
}
