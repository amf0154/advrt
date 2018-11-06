// https://www.sitepoint.com/user-authentication-mean-stack/
var mongoose = require('mongoose');
var User = require('../models/users');
const config = require('../helpers/config.json');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');
var passport = require('passport');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content); 
};
 
module.exports.authUser = function (req, res, next){
    
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);  
 
};
/*
module.exports.authUser = function (req, res, next) {   
    let name = req.body.username;
    let password = req.body.hash;
    if(name && password){
    User
    .findOne({username: name})
    .exec(function(err, authuser){   
        if (authuser && bcrypt.compareSync(password, authuser.hash)) {
        let token = jwt.sign({ sub: authuser.id }, config.secret);
        console.log('token'+token);
         res.json({
        "token" : token
      });
     }else{
         console.log('error');
         res.status(401).json("user not found");
    } 
           
  
       }); 
}else{
    res.json("params haven't obtained");
}

      
  //   const authuser = User.findOne(req.body.username);
   // console.log(authuser);
    /*
    if (authuser && bcrypt.compareSync(password, authuser.hash)) {
        const token = jwt.sign({ sub: authuser.id }, config.secret);
        console.log('token'+token);
         res.json(token);
     }else{
         console.log('error');
         res.json("user not found");
    } 
    */



module.exports.addNewUser = function (req, res, next) {
  /*
    if (User.findOne({ username: req.body.username })) {
      //  throw 'Username "' + userParam.username + '" is already taken';
       res.status(200).json("user with such nickname has allready issued");
       console.log("issue");
    } else{  
    */
    
    User.findOne({username: req.body.username }).exec(function(err, user){
     if(user){
          res.status(200).json("user with such nickname has allready registered!");
     }else{
         var newUser = new User();
        newUser.username = req.body.username;
        newUser.setPassword(req.body.hash);
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.createdDate = new Date(); 
   // console.log(newUser);
    newUser.save(function(err) {
    var token;
    token = newUser.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
   }); //end save
         
         
     } //end else (if isset user)
    });
  /*           
    var newUser = new User();
        newUser.username = req.body.username;
        newUser.setPassword(req.body.hash);
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.createdDate = new Date(); 
   // console.log(newUser);
    newUser.save(function(err){
        if(!err){
           res.status(200).json("user has just been registered successfuly");
        }
    });
    */    
    
   /* newUser.save(function(err){
          if(err){
            console.log(err);
          }else{
              res.status(200).json("user has been registered successfuly");
          //  sendJsonResponse(res, 200, "We've catched ur data!");
          }
        });
*/
    /*
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
   */
};

module.exports.delUser = function (req, res, next) {
    userService.delete_user(req.body.id);
};

module.exports.updUser = function (req, res, next) {
    userService.update(req.body.id, req.body)
        .then(() => sendJsonResponse(res, 200,res.json({})))
        .catch(err => sendJsonResponse(res, 404, "can't find user with such id")); 
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
   // var id = req.payload.id;
  // var id = req.params.id;
  //  console.log("id"+id);
 //   res.status(200).json(req.payload._id);
    
    if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
    
    /*
  if(id){
     User
     .findById(id)
   //   .select('hash')
      .exec(function(err, user_params){
         res.status(200).json(user_params);
       });
   }else{
      res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    }); 
   }
    */
};

/*
module.exports.getUserById = function (req, res) {
 var us = userService.getById(req.params.id); 
  if(us){
      sendJsonResponse(res,200,us);
  }else{
      sendJsonResponse(res,200,"not found");
  }
};
*/
module.exports.getUserList = function (req, res) {
  
    User
    .find()
     //   .select('name registeredDate')
        .exec(function(err, data){
       if(err){
           console.log("err"+err);
       }else{        
         sendJsonResponse(res, 200, data); 
           
       } 
    });
    
};