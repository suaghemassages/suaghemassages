const express =  require ('express')
const router = express.Router();
//const mongoose = require ('mongoose');
const CategoryController = require('../controllers/admin/category');

 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/category',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',CategoryController.category_get_all);
router.get('/category-create',CategoryController.category_add_category)
router.post('/category-create',urlencodedParser,CategoryController.category_create_category);

router.get('/:categoryId',CategoryController.category_get_category);
router.get('/edit/:categoryId',CategoryController.category_get_category_edit);
router.post('/edit/:categoryId',urlencodedParser,CategoryController.category_update_category_edit);
router.delete("/:categoryId",  CategoryController.category_delete);

module.exports = router;
