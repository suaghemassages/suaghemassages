const mongoose = require("mongoose");
const Ghemassage = require("../../models/ghemassage");
const Trademark = require("../../models/trademark");
const Nganhhang = require("../../models/nganhhang");
exports.ghemassages_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
    Ghemassage.find()
      .select("_id name nameseo status nganhhang trademark image imagedefault thumb1 thumb2 price pricesale baohanh title description flashsale bestsell ogtitle ogdescription keywords index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              trademark: doc.trademark,
              nganhhang:doc.nganhhang,
              price: doc.price,
              pricesale: doc.pricesale,
              image: doc.image,
              imagedefault:doc.imagedefault,
              _id: doc._id,
              baohanh:doc.baohanh,
              title:doc.title,
              description:doc.description,
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/home/ghemassages-all',{response:response,layout:'layouts/layoutadmin'})

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

exports.ghemassages_add_ghemassage=(req,res,next)=>{
  Trademark.find()
   .select("_id name index")
   .exec()
   .then(docs => {
     const trademarks = {
       count: docs.length,
       trademark: docs.map(doc => {
         return {
           name: doc.name,
           index: doc.index,
           _id: doc._id,
           request: {
             type: "GET",
             url: "http://localhost:3000/trademark/" + doc._id
           }
         };
       })
     };
     Nganhhang.find()
      .select("_id name index")
      .exec()
      .then(docs => {
        const nganhhangs = {
          count: docs.length,
          nganhhang: docs.map(doc => {
            return {
              name: doc.name,
              index: doc.index,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassage/" + doc._id
              }
            };
          })
        };
     res.render('backend/home/ghemassage-create',{nganhhangs:nganhhangs,trademarks:trademarks,layout:'layouts/layoutadmin'});
        })
     })
     .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });

}
exports.ghemassage_create_ghemassage = (req, res, next) => {
  const ghemassage = new Ghemassage({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    nameseo: req.body.nameseo,
    status: req.body.status,
    nganhhang:req.body.nganhhang,
    trademark:req.body.trademark,
    price: req.body.price,
    pricesale: req.body.pricesale,
    image: req.files['image'],
    imagedefault: req.files['imagedefault'],
    baohanh:req.body.baohanh,
    title:req.body.title,
    description:req.body.description,
    flashsale:req.body.flashsale,
    bestsell:req.body.bestsell,
    ogtitle:req.body.ogtitle,
    ogdescription:req.body.ogdescription,
    keywords:req.body.keywords,
    index:req.body.index
  });
  ghemassage
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/ghemassage')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.ghemassages_get_ghemassage = (req, res, next) => {
  const id = req.params.ghemassageId;
  Ghemassage.findById(id)
    .select("_id name nameseo status nganhhang trademark imagedefault image price pricesale baohanh title description flashsale bestsell ogtitle ogdescription keywords index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/home/ghemassagedetail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.ghemassages_get_ghemassage_edit = (req, res, next) => {
  const id = req.params.ghemassageId;
  Ghemassage.findById(id)
    .select("_id name nameseo status nganhhang trademark imagedefault image price pricesale baohanh title description flashsale bestsell ogtitle ogdescription keywords index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/home/ghemassagedetail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.ghemassages_update_ghemassage = (req, res, next) => {
  const id = req.params.ghemassageId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Ghemassage.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Ghemassage updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/ghemassage/" + id
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
exports.ghemassages_update_ghemassage_edit = (req, res, next) => {
  const id = req.params.ghemassageId;
  Ghemassage.findById(id,function(err,doc){
     if(req.files['image']==undefined && req.files['imagedefault']==undefined){
      doc.name=req.body.name;
      doc.nameseo=req.body.nameseo;
      doc.status=req.body.status;
      doc.nganhhang=req.body.nganhhang;
      doc.trademark=req.body.trademark;
      doc.price=req.body.price;
      doc.pricesale=req.body.pricesale;
      doc.baohanh=req.body.baohanh;
      doc.title=req.body.title;
      doc.description=req.body.description;
      doc.flashsale=req.body.flashsale;
      doc.bestsell=req.body.bestsell;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.index=req.body.index;
      doc.save();
    } else if(req.files['imagedefault']==undefined){
      doc.name=req.body.name;
      doc.nameseo=req.body.nameseo;
      doc.status=req.body.status;
      doc.nganhhang=req.body.nganhhang;
      doc.trademark=req.body.trademark;
      doc.price=req.body.price;
      doc.pricesale=req.body.pricesale;
      doc.image=req.files['image'];
      doc.baohanh=req.body.baohanh;
      doc.title=req.body.title;
      doc.description=req.body.description;
      doc.flashsale=req.body.flashsale;
      doc.bestsell=req.body.bestsell;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.index=req.body.index;
      doc.save();
    }
    else if(req.files['image']==undefined){
      doc.name=req.body.name;
      doc.nameseo=req.body.nameseo;
      doc.status=req.body.status;
      doc.nganhhang=req.body.nganhhang;
      doc.trademark=req.body.trademark;
      doc.price=req.body.price;
      doc.pricesale=req.body.pricesale;
      doc.imagedefault=req.files['imagedefault'];
      doc.baohanh=req.body.baohanh;
      doc.title=req.body.title;
      doc.description=req.body.description;
      doc.flashsale=req.body.flashsale;
      doc.bestsell=req.body.bestsell;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.index=req.body.index;
      doc.save();
    }
    else{
      doc.name=req.body.name;
      doc.nameseo=req.body.nameseo;
      doc.status=req.body.status;
      doc.nganhhang=req.body.nganhhang;
      doc.trademark=req.body.trademark;
      doc.price=req.body.price;
      doc.pricesale=req.body.pricesale;
      doc.imagedefault=req.files['imagedefault'];
      doc.image=req.files['image'];
      doc.baohanh=req.body.baohanh;
      doc.title=req.body.title;
      doc.description=req.body.description;
      doc.flashsale=req.body.flashsale;
      doc.bestsell=req.body.bestsell;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.index=req.body.index;
      doc.save();
      console.log("update",doc);
    }

  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/ghemassage');
  });
}
exports.ghemassage_delete = (req, res, next) => {
  const id = req.params.ghemassageId;
  Ghemassage.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" }
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
