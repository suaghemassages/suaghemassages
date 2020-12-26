const express =  require ('express')
const router = express.Router();
// const mongoose = require ('mongoose');
const UsersController = require('../controllers/admin/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
// mongoose.Promise = global.Promise;
router.get('/',UsersController.users_get_all);

router.get('/user-create',UsersController.users_add_user);
router.post('/user-create',urlencodedParser,UsersController.users_create_user);

router.get('/:userId',UsersController.users_get_user);
router.get('/edit/:userId',UsersController.users_get_user_edit);
router.post('/edit/:userId',urlencodedParser,UsersController.users_update_user_edit);
router.delete("/:userId",  UsersController.user_delete);

module.exports = router;
