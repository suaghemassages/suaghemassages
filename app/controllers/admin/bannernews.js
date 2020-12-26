const mongoose = require("mongoose");
const Bannernews = require("../../models/bannernews");

exports.bannernews_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
    Bannernews.find()
      .select("_id image index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              image: doc.image,
              index: doc.index,
              bannernewsId:doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/bannernews/"
              }
            };
          })
        };
        res.render('backend/bannernews/bannernews-all',{response:response,layout:'layouts/layoutadmin'})

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
exports.bannernews_add_bannernews=(req,res,next)=>{
  res.render('backend/bannernews/bannernews-create',{layout:'layouts/layoutadmin'});
}
exports.bannernews_create_bannernews = (req, res, next) => {
  const bannernews = new Bannernews({
    _id: new mongoose.Types.ObjectId(),
    image: req.file.filename,
    index:req.body.index
  });
  bannernews
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/bannernews')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.bannernews_get_bannernews = (req, res, next) => {
  const id = req.params.bannernewsId;
  Bannernews.findById(id)
    .select("image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/bannernews/bannernews-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.bannernews_get_bannernews_edit = (req, res, next) => {
  const id = req.params.bannernewsId;
  Bannernews.findById(id)
    .select("image index _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/bannernews/bannernews-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.bannernews_update_bannernews = (req, res, next) => {
  const id = req.params.bannernewsId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Bannernews.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "bannernews updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/bannernews/" + id
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
exports.bannernews_update_bannernews_edit = (req, res, next) => {
  const id = req.params.bannernewsId;
  Bannernews.findById(id,function(err,doc){
    if(!req.file){
      doc.index=req.body.index;
      doc.save();
    }
    else{
      doc.image=req.file.filename;
      doc.index=req.body.index;
      doc.save();
    }

  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/bannernews');
  });
}
exports.bannernews_delete = (req, res, next) => {
  const id = req.params.bannernewsId;
  Bannernews.remove({ _id: id })
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
