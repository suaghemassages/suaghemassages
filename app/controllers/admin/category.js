const mongoose = require("mongoose");
const Category = require("../../models/category");

exports.category_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     Category.find()
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
        res.render('backend/category/category-all',{response:response,layout:'layouts/layoutadmin'})

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

exports.category_add_category=(req,res,next)=>{
  res.render('backend/category/category-create',{layout:'layouts/layoutadmin'});
}
exports.category_create_category = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    index:req.body.index
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/category')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.category_get_category = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("name index _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/category/category-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.category_get_category_edit = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("name index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/category/category-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.category_update_category = (req, res, next) => {
  const id = req.params.categoryId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Category.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "category updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/category/" + id
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
exports.category_update_category_edit = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id,function(err,doc){
    doc.name=req.body.name;
    doc.index=req.body.index;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/category');
  });
}
exports.category_delete = (req, res, next) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id })
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
