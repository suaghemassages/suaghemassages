const mongoose = require("mongoose");
const Service = require("../../models/service");

exports.service_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     Service.find()
      .select("_id name index image")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              image:doc.image,
              index: doc.index,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/service/service-all',{response:response,layout:'layouts/layoutadmin'})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    res.redirect('/admin/login');
  }
};
exports.service_add_service=(req,res,next)=>{
  res.render('backend/service/service-create',{layout:'layouts/layoutadmin'});
}
exports.service_create_service = (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    image:req.body.image,
    name: req.body.name,
    index:req.body.index
  });
  service
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/service')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.service_get_service = (req, res, next) => {
  const id = req.params.serviceId;
  Service.findById(id)
    .select("name image index _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/service/service-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.service_get_service_edit = (req, res, next) => {
  const id = req.params.serviceId;
  Service.findById(id)
    .select("name image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/service/service-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.service_update_service = (req, res, next) => {
  const id = req.params.serviceId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Service.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Service updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/Service/" + id
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
exports.service_update_service_edit = (req, res, next) => {
  const id = req.params.serviceId;
  Service.findById(id,function(err,doc){
    doc.name=req.body.name;
    doc.image=req.body.image;
    doc.index=req.body.index;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/service');
  });
}
exports.service_delete = (req, res, next) => {
  const id = req.params.serviceId;
  Service.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: {  }
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
