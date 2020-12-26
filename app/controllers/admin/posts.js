const mongoose = require("mongoose");
const Service = require("../../models/service");
const Post = require("../../models/posts");
exports.posts_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     Post.find()
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          posts: docs.map(doc => {
            return {
              title: doc.title,
              titleseo: doc.titleseo,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotposts:doc.hotposts,
              lastposts:doc.lastposts,
              service:doc.service,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/posts/posts-all',{response:response,layout:'layouts/layoutadmin'})
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
exports.posts_add_posts=(req,res,next)=>{
  Service.find()
   .select("_id name image index")
   .exec()
   .then(docs => {
     const services = {
       count: docs.length,
       service: docs.map(doc => {
         return {
           name: doc.name,
           image:doc.image,
           index: doc.index,
           _id: doc._id,
           request: {
             type: "GET",
             url: "http://localhost:3000/posts/" + doc._id
           }
         };
       })
     };
    res.render('backend/posts/posts-create',{services:services,layout:'layouts/layoutadmin'});
     })
     .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });

}
exports.posts_create_posts = (req, res, next) => {
  const posts = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    titleseo: req.body.titleseo,
    shortdescription: req.body.shortdescription,
    description: req.body.description,
    image: req.file.filename || "",
    day:req.body.day,
    ogtitle:req.body.ogtitle,
    ogdescription:req.body.ogdescription,
    keywords:req.body.keywords,
    hotposts:req.body.hotposts,
    lastposts:req.body.lastposts,
    service:req.body.service,
    index:req.body.index
  });
  posts
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/posts')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.posts_get_posts = (req, res, next) => {
  const id = req.params.postsId;
  Post.findById(id)
    .select(" title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/posts/posts-detail',{post:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.posts_get_posts_edit = (req, res, next) => {
  const id = req.params.postsId;
  Post.findById(id)
    .select("title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/posts/posts-detail-edit',{post:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.posts_update_posts = (req, res, next) => {
  const id = req.params.postsId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "posts updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/posts/" + id
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
exports.posts_update_posts_edit = (req, res, next) => {
  const id = req.params.postsId;
  Post.findById(id,function(err,doc){
    if(!req.file){
      doc.title= req.body.title;
      doc.titleseo= req.body.titleseo;
      doc.shortdescription= req.body.shortdescription;
      doc.description= req.body.description;
      doc.day=req.body.day;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.hotposts=req.body.hotposts;
      doc.lastposts=req.body.lastposts;
      doc.service=req.body.service;
      doc.index=req.body.index;
      doc.save();
    }else{
      doc.title= req.body.title;
      doc.titleseo= req.body.titleseo;
      doc.shortdescription= req.body.shortdescription;
      doc.description= req.body.description;
      doc.image=req.file.filename;
      doc.day=req.body.day;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.hotposts=req.body.hotposts;
      doc.lastposts=req.body.lastposts;
      doc.service=req.body.service;
      doc.index=req.body.index;
      doc.save();
    }

  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/posts/posts-all');
  });
}
exports.posts_delete = (req, res, next) => {
  const id = req.params.postsId;
  Post.remove({ _id: id })
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
exports.posts_get_hotposts=(req, res, next) => {
  if(req.isAuthenticated()){
     Post.find({hotposts:true})
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          posts: docs.map(doc => {
            return {
              title: doc.title,
              titleseo: doc.titleseo,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotposts:doc.hotposts,
              lastposts:doc.lastposts,
              service:doc.service,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/posts/hotposts',{response:response,layout:'layouts/layoutadmin'})
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
exports.posts_get_lastpostsHome=(req, res, next) => {
  if(req.isAuthenticated()){
     posts.find({lastposts:true})
      .limit(6)
      .skip(0)
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
      .sort('index')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          posts: docs.map(doc => {
            return {
              title: doc.title,
              titleseo: doc.titleseo,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotposts:doc.hotposts,
              lastposts:doc.lastposts,
              service:doc.service,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/posts/lastpostsHome',{response:response,layout:'layouts/layoutadmin'})
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
