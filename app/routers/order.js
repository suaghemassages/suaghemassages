const express = require("express");
const router = express.Router();

const OrdersController = require('../controllers/admin/order');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// Handle incoming GET requests to /orders
router.get("/",  OrdersController.orders_get_all);
router.get('/order-create',OrdersController.orders_add_order)
router.post('/order-create',urlencodedParser,OrdersController.orders_create_order);
router.post("/", OrdersController.orders_create_order);
router.get("/edit/:orderId", OrdersController.order_get_order_edit);
router.post("/edit/:orderId", OrdersController.order_update_order_edit);
router.get("/:orderId",  OrdersController.orders_get_order);

router.delete("/:orderId",  OrdersController.orders_delete_order);

module.exports = router;
