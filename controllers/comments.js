const Post = require('../models/post');

async function create(req, res) {
    try {
        const foundPost = await Post.findById(req.params.id);

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        foundPost.comments.push(req.body);
        await foundPost.save();
        console.log(foundPost)
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
    // const post = await Post.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
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

async function edit(req, res) {
    const post = await Post.findById(req.params.id)
    const commentId = req.params.commentId;
    if (!post) return res.redirect('/posts');
    res.render('comments/edit', { title: 'Edit Comment', post, comment: commentId});
}

// async function update(req, res) {
//     // Note the cool "dot" syntax to query on the property of a subdoc
//     const post = await Post.findOne({'comments._id': req.params.id});
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const userComment = post.comments.id(req.params.id);
//     // Ensure that the comment was created by the logged in user
//     if (!userComment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
//     // Update the text of the comment
//     userComment.content = req.body.content;
//     try {
//       await post.save();
//     } catch (error) {
//       console.error(error);
//     }
//     // Redirect back to the book's show view
//     res.redirect(`/posts/${post._id}`);
//   }
  
async function update(req, res) {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const post = await Post.findById(postId);
    post.comments.id(commentId).content = req.body;
    await post.save();
    res.redirect(`/posts/${post._id}`);
}

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update
}