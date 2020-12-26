const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const DateFlashSaleController = require('../controllers/admin/dateflashsale');

 var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',DateFlashSaleController.dateflashsale_get_all);
router.get('/dateflashsale-create',DateFlashSaleController.dateflashsale_add_dateflashsale)
router.post('/dateflashsale-create',urlencodedParser,DateFlashSaleController.dateflashsale_create_dateflashsale);

router.get('/:dateId',DateFlashSaleController.dateflashsale_get_dateflashsale);
router.get('/edit/:dateId',DateFlashSaleController.dateflashsale_get_dateflashsale_edit);
router.post('/edit/:dateId',urlencodedParser,DateFlashSaleController.dateflashsale_update_dateflashsale_edit);
router.delete("/:dateId",  DateFlashSaleController.dateflashsale_delete);

module.exports = router;
