const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
      try {
       
        let deleted = false;
        let likable  = await Post.findById(req.query.id).populate('likes');
        
         let existingLike =  await Like.findOne({
            post: req.query.id,
            user: req.user._id
        })
        if(existingLike){
           likable.likes.pull(existingLike._id);
           likable.save();

           existingLike.remove();
           deleted = true;
        } else{

             let newLike = await Like.create({
                 user: req.user._id,
                 post: req.query.id,
             });
             
             likable.likes.push(newLike._id);
             likable.save();
        }
        
       return res.json(200,{
          data : {
              deleted : deleted,
          },
          message : "Request Succesfull",
       })
      }
      catch{

      }
}