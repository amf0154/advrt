var mongoose = require('mongoose');
var dbURI = 'mongodb://user:user123@ds143143.mlab.com:43143/advt';
mongoose.connect(dbURI, function(err){
    if(err){
        console.log("CONNECTION TO DB USERS HAS ERROR!");
    }
}); 