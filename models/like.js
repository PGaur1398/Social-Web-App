const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
  user : {
      type : mongoose.Schema.ObjectId,
      ref : 'User'
  },
  post :{
      type : mongoose.Schema.ObjectId,
      ref : 'Post'
    //   require : true,
    //   refPath : 'onModel'
  }
},{
    timestamps : true,
});
module.exports = mongoose.model('Like',likeSchema);