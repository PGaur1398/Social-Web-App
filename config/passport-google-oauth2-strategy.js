const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
passport.use(new googleStrategy({
   clientID : '1035273198288-k0ehm1ah1hlgg5n03nl4nv5plsnai25a.apps.googleusercontent.com',
   clientSecret : 'QO1nfTt5zajRELZivdaw8gUn',
   callbackURL : 'http://localhost:8000/auth/google/callback', 
},
  function(accessToken,refreshToken,profile,callback){
    User.findOne({email : profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err); return;
        }
        if(user){
            return callback(null,user);
        }
        else{
            User.create({
                name : profile.displayName,
                email: profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex'),
            },function(err,user){
              if(err){
              console.log('error in google strategy-passport',err); return;
              }
              else{
              return callback(null,user);
              }
            });
            

        }
    });

  }
))