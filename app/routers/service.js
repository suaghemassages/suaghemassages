const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const ServiceController = require('../controllers/admin/service');
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
// mongoose.connect('mongodb://localhost/service',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',ServiceController.service_get_all);
router.get('/service-create',ServiceController.service_add_service);
router.post('/service-create',upload.single('image'),urlencodedParser,ServiceController.service_create_service);

router.get('/:serviceId',ServiceController.service_get_service);
router.get('/edit/:serviceId',ServiceController.service_get_service_edit);
router.post('/edit/:serviceId',upload.single('image'),urlencodedParser,ServiceController.service_update_service_edit);
router.delete("/:serviceId",  ServiceController.service_delete);

module.exports = router;
