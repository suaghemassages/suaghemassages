const mongoose = require("mongoose");
const Nganhhang = require("../../models/nganhhang");

exports.nganhhang_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     Nganhhang.find()
      .select("_id name index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              index: doc.index,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/nganhhang/nganhhang-all',{response:response,layout:'layouts/layoutadmin'})

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
exports.nganhhang_add_nganhhang=(req,res,next)=>{
  res.render('backend/nganhhang/nganhhang-create',{layout:'layouts/layoutadmin'});
}
exports.nganhhang_create_nganhhang = (req, res, next) => {
  const nganhhang = new Nganhhang({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    index:req.body.index
  });
  nganhhang
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/nganhhang')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.nganhhang_get_nganhhang = (req, res, next) => {
  const id = req.params.nganhhangId;
  Nganhhang.findById(id)
    .select("name index _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/nganhhang/nganhhang-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.nganhhang_get_nganhhang_edit = (req, res, next) => {
  const id = req.params.nganhhangId;
  Nganhhang.findById(id)
    .select("name index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/nganhhang/nganhhang-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.nganhhang_update_nganhhang = (req, res, next) => {
  const id = req.params.nganhhangId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Nganhhang.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "nganhhang updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/nganhhang/" + id
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
exports.nganhhang_update_nganhhang_edit = (req, res, next) => {
  const id = req.params.nganhhangId;
  Nganhhang.findById(id,function(err,doc){
    doc.name=req.body.name;
    doc.index=req.body.index;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/nganhhang');
  });
}
exports.nganhhang_delete = (req, res, next) => {
  const id = req.params.nganhhangId;
  Nganhhang.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", index: "Number" }
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
