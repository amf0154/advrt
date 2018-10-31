var mongoose = require('mongoose');
var Adv = require('../models/adverts');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.getAllAdverts = function (req, res) {
    Adv
     .find()
      .exec(function(err, data){
        if(err){
            sendJsonResponse(res, 404, {'error_message' :'objects haven\'t found'}); 
        }else{ 
            sendJsonResponse(res, 200, data);   
        } 
      });
};

  module.exports.getAdvertById = function (req, res) {
    Adv
     .findById(req.params.id)
      .exec(function(err, data){
        if(err){
            sendJsonResponse(res, 404, {'error_message' :'object with such id hasn\'t found'});   
        }else{ 
            sendJsonResponse(res, 200, data);   
        } 
      });
};
    module.exports.getCommentByIdFromAdvertById = function (req, res) {
    Adv
     .findById(req.params.id)
      .exec(function(err, data){
        if(err){
            console.log("err"+err);
        }else{ 
            var comment = data.comment.filter(obj => obj.toObject().id == req.params.commid);
            sendJsonResponse(res, 200, comment);   
        } 
      });
};






/*
module.exports.getAddvrtByPost = function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://advtu:advtu123@ds143143.mlab.com:43143/advt', function(err, client){
    var collection = client.db('advt').collection('advert');
        collection.find().toArray(function(err,data){
            if (err) throw err;
            sendJsonResponse(res, 200, data);
        });
    });  
};
*/