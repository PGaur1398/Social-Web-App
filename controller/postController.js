
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req,res){
  try{
  if(req.isAuthenticated()){
   
    await Post.create({
      content: req.body.content,
      user: req.user._id
  });
    return res.redirect('back');
}
  return res.redirect('back');
}
catch(err){
  console.log("Error",err);
}
}
module.exports.destroy = async function(req,res){
try{
  let post = await Post.findById(req.params.id);
  if(post.user == req.user.id){
    post.remove();
    await Like.deleteMany({likable : post,onModel : 'Post'});
    // await Like.deleteMany({_id : {$in : post.comments}});
    await Comment.deleteMany({post : req.params.id});
   return res.redirect('back');
  }
  else{
    return res.redirect('back');
  }
}
catch(err){
  console.log("Error",err);
}
}