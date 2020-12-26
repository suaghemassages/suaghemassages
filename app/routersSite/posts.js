const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const Post = require("../models/posts");
const PostController= require("../controllers/site/posts");
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/dich-vu-sua-chua',PostController.posts_get_home);
router.get('/:titleseo',PostController.posts_get_titleseo);
module.exports = router;
