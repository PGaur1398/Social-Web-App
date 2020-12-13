const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'CodingWebApp',
}
passport.use(new JWTstrategy(opts,function(payload,callback){
     User.findById(payload._id,function(err,user){
         if(err){
             console.log('Error in finding user');
             return; 
         }
         if(user){
             return callback(null,user);
         }
         else{
             return callback(null,false);
         }
     })
}));
module.exports = passport;