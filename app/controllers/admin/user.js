const mongoose = require("mongoose");
const User = require("../../models/user");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("_id username password")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            username: doc.username,
            password: doc.password,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/user/"
            }
          };
        })
      };
      res.render('backend/user/user-get-all',{response:response,layout:'layouts/layoutadmin'})

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.users_add_user=(req,res,next)=>{
  res.render('backend/user/user-create',{layout:'layouts/layoutadmin'});
}
exports.users_create_user = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/user')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.users_get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("username password")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/user/userdetail',{user:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.users_get_user_edit = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("username password")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/user/userdetail-edit',{user:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.users_update_user = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/user/" + id
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
exports.users_update_user_edit= (req, res, next) => {
  const id = req.params.userId;
  User.findById(id,function(err,doc){
    doc.username=req.body.username;
    doc.password=req.body.password;
    doc.save();
    console.log(doc);
  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/user');
  });
}
exports.user_delete = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "user deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { username: "String", password: "String" }
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
