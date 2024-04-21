var express = require('express');
var router = express.Router();
const controller = require('../controllers/index');
const { isAuthenticated } = require('../middlewares/appAuth');

router.get('/',isAuthenticated,controller.homePage)

module.exports = router;
