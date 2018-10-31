 var request = require('request');
 const appURL = 'https://uqpi8t76.apps.lair.io';

// https://www.djamware.com/post/5b00bb9180aca726dee1fd6d/mean-stack-angular-6-crud-web-application
// 
// 
 module.exports.addUserPage = function(req, res) {
    res.render('main', {
        title: 'add new user',
        homeInfo: {
            body: 'relax'
        }
    });
 };

 module.exports.aboutPage = function(req, res) {
    res.render('about', {
        title: 'add new user',
        homeInfo: {
            body: 'relax'
        }
    });
 };

 module.exports.viewPage = function(req, res) {
    var url = appURL +'/api/advert/' + req.params.id;
    request(url, function (error, response, body) {
        if(error){
           res.render('view', {
           error_message: "page with such id hasn't found"
         });
            console.log("ERR="+error);
        }else {
          if(response.statusCode === 200){ //good damn right
             const post = JSON.parse(body);
             res.render('view', {
             title: post.title,
             fullstory: post.fullstory,
             comments: post.comment
             });
          }else if(response.statusCode === 404){ //good damn right
             const post = JSON.parse(body);
           console.log(post.error_message); 
             res.render('error', {
             error_message: post.error_message,
             });
      //  console.log(outp);
          }else{
            console.log("error response code= "+response.statusCode);
          }        
         } // end else err
    }); // body   
 };
module.exports.mainPage = function(req, res) { 
var url = appURL +'/api/adverts/';
    request(url, function (error, response, body) {
        if(error){
           res.render('error', {
           error_message: 'can\'t load data for pages'
         });
        }else {
          if(response.statusCode === 200){ //good damn right
             const posts = JSON.parse(body);
             console.log(posts.length);
             res.render('index', {
             adverts: posts
             });
          }else if(response.statusCode === 404){ //good damn right
             const post = JSON.parse(body);
           console.log(post.error_message); 
             res.render('error', {
             error_message: post.error_message,
             });
      //  console.log(outp);
          }else{
            console.log("error response code= "+response.statusCode);
          }        
         } // end else err
    }); // body  
};