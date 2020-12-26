const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const SlidehomeController = require('../controllers/admin/slidehome');
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
router.get('/',SlidehomeController.slidehome_get_all);
router.get('/slidehome-create',SlidehomeController.slidehome_add_slidehome)
router.post('/slidehome-create',upload.single('image'),urlencodedParser,SlidehomeController.slidehome_create_slidehome);

router.get('/:slidehomeId',SlidehomeController.slidehome_get_slidehome);
router.get('/edit/:slidehomeId',SlidehomeController.slidehome_get_slidehome_edit);
router.post('/edit/:slidehomeId',upload.single('image'),urlencodedParser,SlidehomeController.slidehome_update_slidehome_edit);
router.delete("/:slidehomeId",  SlidehomeController.slidehome_delete);

module.exports = router;
