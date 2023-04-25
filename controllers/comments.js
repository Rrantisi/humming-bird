const Post = require('../models/post');

async function create(req, res) {
    try {
        const foundPost = await Post.findById(req.params.id);

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        foundPost.comments.push(req.body);
        await foundPost.save();
        res.redirect(`/posts/${foundPost._id}`);

    } catch(error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}
  
async function deleteComment(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const post = await Post.findById(req.params.id)
    // Rogue user!
    if (!post) return res.redirect('/posts');
    // Remove the review using the remove method available on Mongoose arrays
    post.comments.remove(req.params.commentId);
    // Save the updated movie doc
    await post.save();
    // Redirect back to the movie's show view
    res.redirect(`/posts/${post._id}`);
  }

module.exports = {
    create,
    delete: deleteComment
}