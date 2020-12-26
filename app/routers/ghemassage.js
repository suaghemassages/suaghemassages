const express =  require ('express');
const path =require('path');
const router = express.Router();
//const mongoose = require ('mongoose');
const GhemassagesController = require('../controllers/admin/ghemassage');
const multer = require ('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/assest/image');
      },
      filename:function(req,file,cb){
        var originalname = file.originalname;
       filename = originalname;
        cb(null,filename);
      }
  });
const fileFilter = (req,file,cb)=>{
  if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
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
var cpUpload = upload.fields([{ name: 'imagedefault', maxCount: 1 }, { name: 'image', maxCount: 8 }])
 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
//mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
//mongoose.Promise = global.Promise;
router.get('/',GhemassagesController.ghemassages_get_all);
router.get('/ghemassage-create',GhemassagesController.ghemassages_add_ghemassage)
router.post('/ghemassage-create',cpUpload,urlencodedParser,GhemassagesController.ghemassage_create_ghemassage);

router.get('/:ghemassageId',GhemassagesController.ghemassages_get_ghemassage);
router.get('/edit/:ghemassageId',GhemassagesController.ghemassages_get_ghemassage_edit);
router.post('/edit/:ghemassageId',cpUpload,urlencodedParser,GhemassagesController.ghemassages_update_ghemassage_edit);
router.delete("/:ghemassageId",  GhemassagesController.ghemassage_delete);

module.exports = router;
