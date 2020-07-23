//Requiring the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/Auth', {useNewUrlParser: true,useUnifiedTopology: true });
//Accessing the database
const db = mongoose.connection;

//Error
db.on('error', console.error.bind(console, 'Error Connecting tp MongoDb'));

//up and running then print the message
db.once('open', function(){
    console.log('Connected to Database : MongoDb');
});

module.exports = db;