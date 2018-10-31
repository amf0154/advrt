var mongoose = require('mongoose');
var User = require('../models/users');
 

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content); 
};




module.exports.AddNewUser = function (req, res) {
    if(req.body.name && req.body.group){
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.idgroup = req.body.group;
        newUser.registeredDate = new Date();  
        newUser.save(function(err){
          if(err){
            console.log(err);
          }else{
            sendJsonResponse(res, 200, "We've catched ur data!");
          }
        });
    }else{
        sendJsonResponse(res, 200, "I didn't get ur parameters! Try send this form again");
    }    
};


module.exports.getUserById = function (req, res) {
  if(req.params.id){
     User
     .findById(req.params.id)
      .exec(function(err, data){
         if(err){
            sendJsonResponse(res, 404, "can't find user with such id"); 
         }else{
            sendJsonResponse(res, 200, data); 
         }
       });
   }
};

module.exports.getUserList = function (req, res) {   
    User
    .find()
        .select('name registeredDate')
        .exec(function(err, data){
       if(err){
           console.log("err"+err);
       }else{        
         sendJsonResponse(res, 200, data); 
           
       } 
    });
};