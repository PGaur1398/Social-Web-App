const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if (post){
    let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        post.comments.push(comment._id);
        post.save();
    if(req.xhr){
        return res.json(200,{
        data : {
            comment : comment
        },
        message: "Comment Added!!"
        });
    }
    res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}
   catch(err){
       console.log('Error',err);
   }
}