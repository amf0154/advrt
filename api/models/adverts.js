var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    idgroup: {
        type: Number,
        "default": 1
    },
    registeredDate: {        
        type: Date,
        "default": Date.now
    }
}); 

var groupSchema = new mongoose.Schema({
    name: String,
    idgroup: Number 
}); 
var commentSchema = new mongoose.Schema({
    author: String,
    commentText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var advertSchema = new mongoose.Schema({
    title: String,
    fullstory: String,
    comment: [commentSchema]
});

 
module.exports = mongoose.model('Adverts',advertSchema);
/*
mongo ds143143.mlab.com:43143/advt -u advtu -p advtu123

 db.advert.save({
    title: "Bridge to Mars",
    fullstory: "Barely used, looks like a new. U'd better by this here or i come for you!" 
 });
db.advert.update({
  title: "Bridge to Mars"
},{
  $push:{
      comment: {
       id: ObjectId(),
       author: "Michel Levine",
       commentText: "Very cool",
       createdOn: new Date("Oct 26, 2018")  
      }
  }  
});

db.advert.update({
  title: "Sofa neveroyatnaya"
},{
  $push:{
      comment: {
       id: ObjectId(),
       author: "Little Crazy",
       commentText: "Wow! It's really cool stuff, but unfortunately, i can't buy it right now as dont have enough money()",
       createdOn: new Date("Oct 26, 2018")  
      }
  }  
});
*/
 