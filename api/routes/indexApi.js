var express = require('express');
var router = express.Router();
var ctrlAdv = require('../controllers/adverts');
var ctrlUser = require('../controllers/users');
var app = express();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


router.get('/adverts/', ctrlAdv.getAllAdverts);
router.get('/advert/:id', ctrlAdv.getAdvertById);
router.get('/advert/:id/comment/:commid', ctrlAdv.getCommentByIdFromAdvertById);
router.get('/users/', ctrlUser.getUserList);
router.get('/user/:id', auth, ctrlUser.getUserById);
router.post('/adduser', ctrlUser.addNewUser);
router.post('/auth', ctrlUser.authUser);
router.post('/upduser', ctrlUser.updUser);
router.post('/deluser', ctrlUser.delUser);


module.exports = router;