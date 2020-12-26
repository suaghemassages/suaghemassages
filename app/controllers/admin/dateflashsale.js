const mongoose = require("mongoose");
const DateFlashSale = require("../../models/dateflashsale");

exports.dateflashsale_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
    DateFlashSale.find()
      .select("_id date")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              _id: doc._id,
              date:doc.date,
              request: {
                type: "GET",
                url: "http://localhost:3000/date/" + doc._id
              }
            };
          })
        };
        res.render('backend/home/date/dateflashsale-all',{response:response,layout:'layouts/layoutadmin'})

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

exports.dateflashsale_add_dateflashsale=(req,res,next)=>{
  res.render('backend/home/date/dateflashsale-create',{layout:'layouts/layoutadmin'});
}
exports.dateflashsale_create_dateflashsale = (req, res, next) => {
  const dateflashsale = new DateFlashSale({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date
  });
  dateflashsale
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/date')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.dateflashsale_get_dateflashsale = (req, res, next) => {
  const id = req.params.dateId;
  DateFlashSale.findById(id)
    .select("_id date")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/home/date/dateflashsale-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.dateflashsale_get_dateflashsale_edit = (req, res, next) => {
  const id = req.params.dateId;
  DateFlashSale.findById(id)
    .select("_id date")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/home/date/dateflashsale-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.dateflashsale_update_dateflashsale = (req, res, next) => {
  const id = req.params.dateId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  DateFlashSale.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Date updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/date/" + id
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
exports.dateflashsale_update_dateflashsale_edit = (req, res, next) => {
  const id = req.params.dateId;
  DateFlashSale.findById(id,function(err,doc){
    doc.date=req.body.date;
    doc.save();
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/date');
  });
}
exports.dateflashsale_delete = (req, res, next) => {
  const id = req.params.dateId;
  DateFlashSale.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/date",
          body: { date: "Date" }
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
