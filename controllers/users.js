const User = require('../models/user');
const Post = require('../models/post');

async function show(req, res) {
    try {
        const userId = req.params.userId;
        const foundUser = await User.findById(userId);
        const posts = await Post.find({ 'comments.user': userId }); 
        let comments = [];
        posts.forEach((post) => {
          post.comments.forEach((comment) => {
            if (comment.user.toString() === userId) {
              comments.push(comment) ;  
            }
          })
        });
        res.render('users/show', {
            title: 'User Details',
            user: foundUser,
            comments,
            posts
        })
    } catch (error) {
        console.error(error);
        res.render('error', {
            title: 'Something Went Wrong!'
        })
    }
}

async function edit(req, res) {
    const userId = req.params.userId;
    const foundUser = await User.findById(userId);
    res.render('users/edit', { title: 'Add More Info', user: foundUser});
  }
  
  async function update(req, res) {
    const user = await User.findOne({'_id': req.params.userId});
    if (!user.equals(req.user._id)) return res.redirect(`/posts`);
    user.location = req.body.location;
    user.bio = req.body.bio;
    user.socialLinks = req.body.socialLinks;
    try {
      await user.save();
    } catch (error) {
      console.error(error);
      res.render("error", {
        title: "Something Went Wrong!",
      });
    }
    res.redirect(`/users/${user._id}`);
  }

module.exports = {
    show,
    edit,
    update
}
