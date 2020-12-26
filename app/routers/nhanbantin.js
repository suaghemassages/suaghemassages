const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const NhanbantinController = require('../controllers/site/nhanbantin');
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.post('/ban-tin-news',urlencodedParser,NhanbantinController.nhanbantin_post_email_tintuc);
router.post('/ban-tin-home',urlencodedParser,NhanbantinController.nhanbantin_post_email_home);
module.exports = router;
