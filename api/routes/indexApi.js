var express = require('express');
var router = express.Router();
var ctrlAdv = require('../controllers/adverts');
var ctrlUser = require('../controllers/users');


router.get('/adverts/', ctrlAdv.getAllAdverts);
router.get('/advert/:id', ctrlAdv.getAdvertById);
router.get('/advert/:id/comment/:commid', ctrlAdv.getCommentByIdFromAdvertById);
router.get('/users/', ctrlUser.getUserList);
router.get('/user/:id', ctrlUser.getUserById);
router.post('/adduser', ctrlUser.AddNewUser);


module.exports = router;