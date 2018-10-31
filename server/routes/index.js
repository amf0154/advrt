var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');


router.get('/', ctrlMain.mainPage);
router.get('/view/:id', ctrlMain.viewPage);
router.get('/adduser', ctrlMain.addUserPage);
router.get('/about', ctrlMain.aboutPage);
module.exports = router;