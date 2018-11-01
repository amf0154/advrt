var mongoose = require('mongoose');
var User = require('../models/users');
const userService = require('../services/user.service');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content); 
};



module.exports.addNewUser = function (req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
};

module.exports.delUser = function (req, res, next) {
    userService.delete_user(req.body.id);
};

module.exports.updUser = function (req, res, next) {
    userService.update(req.body.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
};

/*
module.exports.AddNewUser = function (req, res) {
    if(req.body.username){
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.hash = req.body.hash;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.createdDate = new Date(); 
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

*/

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