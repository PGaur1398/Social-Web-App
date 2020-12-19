//Requring Database
const User = require('../models/User');
const Post = require('../models/post');
// controller to render home page
module.exports.home = function(req, res){
     if(req.isAuthenticated()){
         return res.redirect('/profile');
     }
        return res.render('home',{
         title: "Home",
        });

}
module.exports.profile  =  async function(req,res){
    try{
    let users = await User.find({});
    let posts = await Post.find({})
    .populate('user')
    .sort('-createdAt')
    .populate({
        path : 'comments',
    populate : {
        path : 'user'
    }

    })
    .populate('likes')

       return res.render('profile',{
           title : "Home | Profile",
           users : users,
           posts : posts
       });
    }
    catch(err){
        console.log(err);
    }

}
module.exports.profileInfo = async function(req,res){
    try{
    let user = await User.findById(req.params.id);
    return res.render('profile-info',{
           title : "Profille-Info",
           profile : user
    });
}
catch(err){
    console.log("Error",err);
}
}
module.exports.updateAboutMe = async function(req,res){
    try{
       if(req.user.id == req.params.id){
         await  User.findByIdAndUpdate(req.params.id,{about : req.body.about});
          if(req.xhr){
           return res.json(200,{
            data : {
                info : req.body.about,
            },
            message: "About Me Updated"
            });
        }
        return res.redirect('back');
    }
    else{
        return res.status('404');
    }
    }
    catch(err){
         console.log('Error: ',err);
    }
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

return res.redirect('/profile');
}
module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect('/');
}
