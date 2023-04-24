const Post = require('../models/post');

function newPost(req,res) {
    res.render('posts/new', { title: 'Add a New Post'})
}

async function create(req, res) {
    try {
        const post = await Post.create(req.body);
        res.redirect(`/posts/${post._id}`)

    } catch(error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}


async function show(req, res) {
    try {
        const foundPost = await Post.findById(req.params.id);
        res.render('posts/show', {
            title: 'Post Details',
            post: foundPost,
        })
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}


module.exports = {
    new: newPost,
    create,
    show
}