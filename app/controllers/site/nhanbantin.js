const mongoose = require("mongoose");
const Nhanbantin = require("../../models/nhanbantin");
exports.nhanbantin_post_email_tintuc = (req, res, next) => {
  const nhanbantin = new Nhanbantin({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email
  });
  nhanbantin
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/tin-tuc');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.nhanbantin_post_email_home = (req, res, next) => {
  const nhanbantin = new Nhanbantin({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email
  });
  nhanbantin
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
