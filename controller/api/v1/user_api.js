const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

module.exports.createSeesion = async function(req,res){
    try{
//    let user = await User.findOne({email : req.body.email});
//     if(!user || user.password != req.body.password){
//         return res.json(422,{
//             message : "Invalid Userna,e or password",
//         })
//     }
//     else{
//         return res.json(200,{
//             message : 'Succesful',
//             data:{
//                 token : jwt.sign(user.toJSON(),'CodingWebApp',{expiresIn : 1000000}),
//             }
//         })
//     }
    return res.redirect('back');
    }
    catch(err){
        // console.log(err);
        // return res.json(500,{
        //     message : "Internal Server Error",
        // })
    }
}