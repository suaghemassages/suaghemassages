const mongoose = require("mongoose");
const Trademark = require("../../models/trademark");
const Nganhhang = require("../../models/nganhhang");
exports.trademark_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     Trademark.find()
      .select("_id name index nganhhang")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              index: doc.index,
              nganhhang:doc.nganhhang,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/trademark/trademark-all',{response:response,layout:'layouts/layoutadmin'})

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
exports.trademark_add_trademark=(req,res,next)=>{
  Nganhhang.find()
   .select("_id name index nganhhang")
   .exec()
   .then(docs => {
     const nganhhangs = {
       count: docs.length,
       nganhhang: docs.map(doc => {
         return {
           name: doc.name,
           index: doc.index,
           nganhhang:doc.nganhhang,
           _id: doc._id,
           request: {
             type: "GET",
             url: "http://localhost:3000/ghemassages/" + doc._id
           }
         };
       })
     };
     res.render('backend/trademark/trademark-create',{nganhhangs:nganhhangs,layout:'layouts/layoutadmin'});
   })
}
exports.trademark_create_trademark = (req, res, next) => {
  const trademark = new Trademark({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    index:req.body.index,
    nganhhang:req.body.nganhhang
  });
  trademark
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/trademark')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.trademark_get_trademark = (req, res, next) => {
  const id = req.params.trademarkId;
  Trademark.findById(id)
    .select("name index nganhhang _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/trademark/trademark-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.trademark_get_trademark_edit = (req, res, next) => {
  const id = req.params.trademarkId;
  Trademark.findById(id)
    .select("name nganhhang index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/trademark/trademark-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.trademark_update_trademark = (req, res, next) => {
  const id = req.params.trademarkId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Trademark.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "trademark updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/trademark/" + id
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
exports.trademark_update_trademark_edit = (req, res, next) => {
  const id = req.params.trademarkId;
  Trademark.findById(id,function(err,doc){
    doc.name=req.body.name;
    doc.index=req.body.index;
    doc.nganhhang=req.body.nganhhang;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/trademark');
  });
}
exports.trademark_delete = (req, res, next) => {
  const id = req.params.trademarkId;
  Trademark.remove({ _id: id })
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
