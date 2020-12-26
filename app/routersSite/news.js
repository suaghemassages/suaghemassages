const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const News = require("../models/news");
const Trademark = require("../models/trademark");
const NewsController= require("../controllers/site/news");
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',NewsController.news_get_home);
router.get('/:titleseo',NewsController.news_get_titleseo);

module.exports = router;
