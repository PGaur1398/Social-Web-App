//Requring Database
const User = require('../models/User');
const Post = require('../models/post')
// controller to render home page
module.exports.home = function(req, res){
     if(req.isAuthenticated()){
         return res.redirect('/profile');
     }
        return res.render('home',{
         title: "Home",
        });

}
module.exports.profile  =  function(req,res){
    // return res.render('profile',{
    //     title : "collapse-1"
    // });
    Post.find({}).populate('user').exec(function(err,posts){
       return res.render('profile',{
           title : "Home | Profile",
           posts : posts
       });
    });
}

module.exports.signUp = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){

        if(err){ alert('error occured!');return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){ console.log('error occured!');return;}
                console.log('User is Registered');
                return res.redirect('back');
            })
        }
        else{
            console.log('User already Exist');
            return res.redirect('back');
        }
    })
}
module.exports.signIn = function(req,res){
//     User.findOne({email : req.body.email},function(err,user){
//     if(err){ console.log('error occured!');return }
//     if(user){
//         if(user.password != req.body.password){
//            return res.redirect('back');
//         }
//         res.cookie('user_id',user.id);
//         return res.redirect('back');
//     }
//     else{
//         console.log(user);
//         res.redirect('back');
//     }
// })
return res.redirect('/profile');
}
module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect('/');
}
