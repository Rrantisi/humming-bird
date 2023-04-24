const Post = require('../models/post');

async function create(req, res) {
    try {
        const foundPost = await Post.findById(req.params.id);
        foundPost.comments.push(req.body);
        await foundPost.save();
        res.redirect(`/posts/${req.params.id}`);

    } catch(error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}

module.exports = {
    create,
}