const Post = require("../models/post");

async function create(req, res) {
  try {
    const foundPost = await Post.findById(req.params.id);

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    foundPost.comments.push(req.body);
    await foundPost.save();
    res.redirect(`/posts/${foundPost._id}`);
  } catch (error) {
    console.error(error);
    res.render("error", {
      title: "Something Went Wrong!",
    })
  }
}

async function deleteComment(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.redirect("/posts");
  post.comments.remove(req.params.commentId);
  await post.save();
  res.redirect(`/posts/${post._id}`);
}

async function edit(req, res) {
  const post = await Post.findById(req.params.id)
  const comment = post.comments.id(req.params.commentId)
  if (!post) return res.redirect('/posts');
  res.render('comments/edit', { title: 'Edit Comment', post, comment});
}

async function update(req, res) {
  const post = await Post.findOne({'comments._id': req.params.commentId});
  const comment = post.comments.id(req.params.commentId);
  if (!comment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
  comment.content = req.body.content;
  try {
    await post.save();
  } catch (error) {
    console.error(error);
    res.render("error", {
      title: "Something Went Wrong!",
    });
  }
  res.redirect(`/posts/${post._id}`);
}

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
};
