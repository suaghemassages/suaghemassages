const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const NewsController = require('../controllers/admin/news');
const multer = require ('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/assest/image');
      },
      filename:function(req,file,cb){
        cb(null,file.originalname);
      }
  });
const fileFilter = (req,file,cb)=>{
  if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }else{
    cb(null,false);
  }
};

//init upload
const upload = multer({
  storage:storage,
  limits:{fileSize:1024 * 1024 * 5},
  fileFilter:fileFilter
});

 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',NewsController.news_get_all);
router.get('/news-create',NewsController.news_add_news)
router.post('/news-create',upload.single('image'),urlencodedParser,NewsController.news_create_news);
router.get('/hotnews',NewsController.news_get_hotnews);
router.get('/lastnewsHome',NewsController.news_get_lastnewsHome);
//tất cả /tenfile phải nằm trên :newsId vì nó ko phân biệt được là id hay là tenfile
router.get('/:newsId',NewsController.news_get_news);

router.get('/edit/:newsId',NewsController.news_get_news_edit);
router.post('/edit/:newsId',upload.single('image'),urlencodedParser,NewsController.news_update_news_edit);
router.delete("/:newsId",  NewsController.news_delete);

module.exports = router;
