const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const User = require('../models/User');
//authentication using passport
passport.use(new LocalStrategy({
  usernameField : 'email'
  },
    function(email,password,done){
      //find a user and establish the identity
      User.findOne({email : email},function(err,user){
          if(err){console.log('Erro in finding user -> Passport'); return done(err);}
    
     
      if(!user || user.password != password){
          console.log('Invalid Username or Password');
          return done(null,false);
      }
      return done(null,user);
    });
    }
));

// serializing the user to decide which key need to be stored in the cookie
  passport.serializeUser(function(user,done){
     done(null,user.id);

  });


//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log('Erro in finding user -> Passport'); return done(err);}
        
        return done(null,user);

    })
});
// Check if the user is authenticated or not

passport.checkAuthentication = function(req,res,next){
  // If the user is signed in then pass the request to next function(controller's action)
  if(req.isAuthenticated())
      return next();
  // If the user is not signed in
  return res.redirect('/');
}
passport.setAuthenticated = function(req,res,next){
  if(req.isAuthenticated()){
  //req.user contains the current signed user from the session cookie
  res.locals.user = req.user;
}
next();
}
module.exports = passport;