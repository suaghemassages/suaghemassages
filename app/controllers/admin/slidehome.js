const mongoose = require("mongoose");
const Slidehome = require("../../models/slidehome");

exports.slidehome_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
    Slidehome.find()
      .select("_id image index title")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              image: doc.image,
              title: doc.title,
              index: doc.index,
              slidehomeId:doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/slidehome/"
              }
            };
          })
        };
        res.render('backend/slidehome/slidehome-all',{response:response,layout:'layouts/layoutadmin'})

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
exports.slidehome_add_slidehome=(req,res,next)=>{
  res.render('backend/slidehome/slidehome-create',{layout:'layouts/layoutadmin'});
}
exports.slidehome_create_slidehome = (req, res, next) => {
  const slidehome = new Slidehome({
    _id: new mongoose.Types.ObjectId(),
    image: req.file.filename,
    title:req.body.title,
    index:req.body.index
  });
  slidehome
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/slidehome')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.slidehome_get_slidehome = (req, res, next) => {
  const id = req.params.slidehomeId;
  Slidehome.findById(id)
    .select("image title index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/slidehome/slidehome-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.slidehome_get_slidehome_edit = (req, res, next) => {
  const id = req.params.slidehomeId;
  Slidehome.findById(id)
    .select("image title index _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/slidehome/slidehome-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.slidehome_update_slidehome = (req, res, next) => {
  const id = req.params.slidehomeId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Slidehome.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "slidehome updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/slidehome/" + id
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
exports.slidehome_update_slidehome_edit = (req, res, next) => {
  const id = req.params.slidehomeId;
  Slidehome.findById(id,function(err,doc){
    if(!req.file){
      doc.title=req.body.title;
      doc.index=req.body.index;
      doc.save();
    }else{
      doc.image=req.file.filename;
      doc.title=req.body.title;
      doc.index=req.body.index;
      doc.save();
    }
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/slidehome');
  });
}
exports.slidehome_delete = (req, res, next) => {
  const id = req.params.slidehomeId;
  Slidehome.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { image: "String", index: "Number" }
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
