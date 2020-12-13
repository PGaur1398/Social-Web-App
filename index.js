const express = require('express'); 
const app = express(); 
const cookieParser =  require('cookie-parser');
//Use for Session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const Mongostore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');

// const chatserver = require('http').Server(app);
// const chatSocket = require('./config/chat_socket').chatSocket(chatserver);
// chatServer.listen(5000);
// console.log('chat serveris listening on ort 5000');

app.use(expressLayouts);
//Reading Post requests
app.use(express.urlencoded());

app.use(cookieParser());

//Setting up static files
app.use(express.static("./assets"));

// requiring mongoose to setup db
const db = require('./config/mongoose');



//Setting Up ejs as View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Mongo Store is used to store the session cookie
app.use(session({
      name : "Auth",
      //Todo change the secret before deployment in the production mode;
      secret : "Something",
      saveUninitialized : false,
      resave : false,
      cookie : {
         maxAge : (1000 * 60 * 100)

      },
      store : new Mongostore({
        mongooseConnection : db,
        autoRemove : 'disabled'
          
      },
      function(err){
          console.log(err || 'connect-mongodb setup ok');
      }
      )

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

// use express router
app.use('/', require('./routes'));
//Starting express server
app.listen(8000, function(err){
    if(err){
        console.log('Error in running the server : 8000');
    }

    console.log('Server is running on port: 8000');
});