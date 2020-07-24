
const Post = require('../models/post');
module.exports.create = function(req,res){
  if(req.isAuthenticated()){
   
    Post.create({
      content: req.body.content,
      user: req.user._id

  }),function(err,post){
      if(err){console.log('err in creating posts'); return;}
      return res.redirect('back');

  } 
}
  
  return res.redirect('back');
}