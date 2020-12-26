const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const NganhhangController = require('../controllers/admin/nganhhang');

 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/nganhhang',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',NganhhangController.nganhhang_get_all);
router.get('/nganhhang-create',NganhhangController.nganhhang_add_nganhhang)
router.post('/nganhhang-create',urlencodedParser,NganhhangController.nganhhang_create_nganhhang);

router.get('/:nganhhangId',NganhhangController.nganhhang_get_nganhhang);
router.get('/edit/:nganhhangId',NganhhangController.nganhhang_get_nganhhang_edit);
router.post('/edit/:nganhhangId',urlencodedParser,NganhhangController.nganhhang_update_nganhhang_edit);
router.delete("/:nganhhangId",  NganhhangController.nganhhang_delete);

module.exports = router;
