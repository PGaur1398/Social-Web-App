const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    //include the array of id's of all the comments in this post schema itself
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
 },{
        timestamps: true,
    });

module.exports = mongoose.model('Post', postSchema);