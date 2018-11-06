var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');


router.get('/', ctrlMain.mainPage);
router.get('/view/:id', ctrlMain.viewPage);
router.get('/adduser', ctrlMain.addUserPage);
router.get('/upduser', ctrlMain.updUserPage);
router.get('/deluser', ctrlMain.delUserPage);
router.get('/auth', ctrlMain.authUserPage);
router.get('/about', ctrlMain.aboutPage);
module.exports = router;