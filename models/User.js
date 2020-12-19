const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false,
        default: "None",
    },
    sentRequests:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        }],
    requests : [{
        type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }],
    friendsList:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        }],
 }, {
       timestamps: true
   
});

module.exports = mongoose.model('User', userSchema);

