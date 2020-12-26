const mongoose = require("mongoose");
const News = require("../../models/news");
const Category = require("../../models/category");
exports.news_get_all = (req, res, next) => {
  if(req.isAuthenticated()){
     News.find()
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          news: docs.map(doc => {
            return {
              title: doc.title,
              titleseo:doc.titleseo,
              slidenews:doc.slidenews,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotnews:doc.hotnews,
              lastnews:doc.lastnews,
              category:doc.category,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/news/news-all',{response:response,layout:'layouts/layoutadmin'})
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
exports.news_add_news=(req,res,next)=>{
  Category.find()
   .select("_id name index")
   .exec()
   .then(docs => {
     const categorys = {
       count: docs.length,
       category: docs.map(doc => {
         return {
           name: doc.name,
           index: doc.index,
           _id: doc._id,
           request: {
             type: "GET",
             url: "http://localhost:3000/news/" + doc._id
           }
         };
       })
     };
    res.render('backend/news/news-create',{categorys:categorys,layout:'layouts/layoutadmin'});
     })
     .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });

}
exports.news_create_news = (req, res, next) => {
  const news = new News({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    titleseo:req.body.titleseo,
    slidenews:req.body.slidenews,
    shortdescription: req.body.shortdescription,
    description: req.body.description,
    image: req.file.filename,
    day:req.body.day,
    ogtitle:req.body.ogtitle,
    ogdescription:req.body.ogdescription,
    keywords:req.body.keywords,
    hotnews:req.body.hotnews,
    lastnews:req.body.lastnews,
    category:req.body.category,
    index:req.body.index
  });
  news
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/news')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.news_get_news = (req, res, next) => {
  const id = req.params.newsId;
  News.findById(id)
    .select(" title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/news/news-detail',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.news_get_news_edit = (req, res, next) => {
  const id = req.params.newsId;
  News.findById(id)
    .select("title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.render('backend/news/news-detail-edit',{ghemassage:doc,layout:'layouts/layoutadmin'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.news_update_news = (req, res, next) => {
  const id = req.params.newsId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  News.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "news updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/news/" + id
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
exports.news_update_news_edit = (req, res, next) => {
  const id = req.params.newsId;
  News.findById(id,function(err,doc){
    if(!req.file){
      doc.title= req.body.title;
      doc.titleseo=req.body.titleseo;
      doc.slidenews=req.body.slidenews;
      doc.shortdescription= req.body.shortdescription;
      doc.description= req.body.description;
      doc.day=req.body.day;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.hotnews=req.body.hotnews;
      doc.lastnews=req.body.lastnews;
      doc.category=req.body.category;
      doc.index=req.body.index;
      doc.save();
    }else{
      doc.title= req.body.title;
      doc.titleseo=req.body.titleseo;
      doc.slidenews=req.body.slidenews;
      doc.shortdescription= req.body.shortdescription;
      doc.description= req.body.description;
      doc.day=req.body.day;
      doc.ogtitle=req.body.ogtitle;
      doc.ogdescription=req.body.ogdescription;
      doc.keywords=req.body.keywords;
      doc.hotnews=req.body.hotnews;
      doc.lastnews=req.body.lastnews;
      doc.category=req.body.category;
      doc.index=req.body.index;
      doc.image=req.file.filename;
      doc.save();
    }

  })
  .exec()
  .then((err,doc)=>{
    res.redirect('/news');
  });
}
exports.news_delete = (req, res, next) => {
  const id = req.params.newsId;
  News.remove({ _id: id })
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
exports.news_get_hotnews=(req, res, next) => {
  if(req.isAuthenticated()){
     News.find({hotnews:true})
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          news: docs.map(doc => {
            return {
              title: doc.title,
              titleseo:doc.titleseo,
              slidenews:doc.slidenews,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotnews:doc.hotnews,
              lastnews:doc.lastnews,
              category:doc.category,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/news/hotnews',{response:response,layout:'layouts/layoutadmin'})
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
exports.news_get_lastnewsHome=(req, res, next) => {
  if(req.isAuthenticated()){
     News.find({lastnews:true})
      .limit(6)
      .skip(0)
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
      .sort('index')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          news: docs.map(doc => {
            return {
              title: doc.title,
              titleseo:doc.titleseo,
              slidenews:doc.slidenews,
              shortdescription: doc.shortdescription,
              _id: doc._id,
              description:doc.description,
              day:doc.day,
              ogtitle:doc.ogtitle,
              ogdescription:doc.ogdescription,
              keywords:doc.keywords,
              hotnews:doc.hotnews,
              lastnews:doc.lastnews,
              category:doc.category,
              image:doc.image,
              index:doc.index,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('backend/news/lastnewsHome',{response:response,layout:'layouts/layoutadmin'})
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
