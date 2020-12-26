const mongoose = require("mongoose");
const Order = require("../../models/order");
const Ghemassage = require("../../models/ghemassage");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("ghemassage quantity _id")
    .populate("ghemassage","name" )
    .exec()
    .then(docs => {
      console.info(docs);
      const response={
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            ghemassage: doc.ghemassage,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      }
      res.render('backend/home/orders-all',{response:response,layout:'layouts/layoutadmin'})
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
exports.orders_add_order=(req,res,next)=>{
  Ghemassage.find().exec()
    .then((docs)=>{
      const response = {
        count: docs.length,
        ghemassages: docs.map(doc => {
          return {
            _id: doc._id,
            name:doc.name
          };
        })
      };
      res.render('backend/home/order-create',{response:response,layout:'layouts/layoutadmin'});
    })
}
exports.orders_create_order = (req, res, next) => {
  Ghemassage.findById(req.body.ghemassageId)
    .then(ghemassage => {
      if (!ghemassage) {
        return res.status(404).json({
          message: "Ghemassage not found"
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        ghemassage: req.body.ghemassageId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          ghemassage: result.ghemassage,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select('quantity ghemassage')
    .populate("ghemassage")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.render('backend/home/orderdetail',{order:order,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
exports.order_get_order_edit = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select("_id ghemassage quantity")
    .populate("ghemassage name")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/home/orderdetail-edit',{order:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.order_update_order = (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/order/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.order_update_order_edit = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id,function(err,doc){
    doc.quantity=req.body.quantity;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/orders');
  });
}
exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { ghemassageId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
