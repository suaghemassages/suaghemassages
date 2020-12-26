const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const TrademarkController = require('../controllers/admin/trademark');

 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/trademark',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',TrademarkController.trademark_get_all);
router.get('/trademark-create',TrademarkController.trademark_add_trademark);
router.post('/trademark-create',urlencodedParser,TrademarkController.trademark_create_trademark);

router.get('/:trademarkId',TrademarkController.trademark_get_trademark);
router.get('/edit/:trademarkId',TrademarkController.trademark_get_trademark_edit);
router.post('/edit/:trademarkId',urlencodedParser,TrademarkController.trademark_update_trademark_edit);
router.delete("/:trademarkId",  TrademarkController.trademark_delete);

module.exports = router;
