const express =  require ('express')
const router = express.Router();
//const mongoose = require ('mongoose');
const bannernewsController = require('../controllers/admin/bannernews');
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
router.get('/',bannernewsController.bannernews_get_all);
router.get('/bannernews-create',bannernewsController.bannernews_add_bannernews)
router.post('/bannernews-create',upload.single('image'),urlencodedParser,bannernewsController.bannernews_create_bannernews);
router.get('/:bannernewsId',bannernewsController.bannernews_get_bannernews);
router.get('/edit/:bannernewsId',bannernewsController.bannernews_get_bannernews_edit);
router.post('/edit/:bannernewsId',upload.single('image'),urlencodedParser,bannernewsController.bannernews_update_bannernews_edit);
router.delete("/:bannernewsId",  bannernewsController.bannernews_delete);

module.exports = router;
