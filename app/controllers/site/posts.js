const mongoose = require("mongoose");
const Post = require("../../models/posts");
const Service= require("../../models/service");
const Trademark=require("../../models/trademark");
const Ghemassage=require("../../models/ghemassage");
exports.posts_get_home = (req, res, next) => {
  if(req.useragent.isMobile){
    res.render('mobile/homemobile',{layout:'layouts/layoutmobile'});
  }
  else{
        Post.find()
             .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
             .limit(6)
             .sort('index')
             .exec()
             .then(docs => {
               const poststonghop = {
                 count: docs.length,
                 post: docs.map(doc => {
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
               console.log("postonghop",poststonghop);
               Trademark.find({nganhhang:"Ghế massage"})
                .limit(8)
                .skip(0)
                .select("_id name nganhhang index")
                .exec()
                .then(docs => {
                  const trademarks = {
                    count: docs.length,
                    trademark: docs.map(doc => {
                      return {
                        _id: doc._id,
                        name:doc.name,
                        nganhhang:doc.nganhhang,
                        index:doc.index,
                        request: {
                          type: "GET",
                          url: "http://localhost:3000/ghemassages/" + doc._id
                        }
                      };
                    })
                  };
                  Trademark.find({nganhhang:"Máy chạy bộ"})
                   .limit(10)
                   .skip(0)
                   .select("_id name nganhhang index")
                   .exec()
                   .then(docs => {
                     const trademarksmaychaybo = {
                       count: docs.length,
                       trademark: docs.map(doc => {
                         return {
                           _id: doc._id,
                           name:doc.name,
                           nganhhang:doc.nganhhang,
                           index:doc.index,
                           request: {
                             type: "GET",
                             url: "http://localhost:3000/ghemassages/" + doc._id
                           }
                         };
                       })
                     };
                     Trademark.find({nganhhang:/bếp/i})
                      .limit(8)
                      .skip(0)
                      .select("_id name nganhhang index")
                      .exec()
                      .then(docs => {
                        const trademarksbep = {
                          count: docs.length,
                          trademark: docs.map(doc => {
                            return {
                              _id: doc._id,
                              name:doc.name,
                              nganhhang:doc.nganhhang,
                              index:doc.index,
                              request: {
                                type: "GET",
                                url: "http://localhost:3000/ghemassages/" + doc._id
                              }
                            };
                          })
                        };
                        Post.find({lastposts:true})
                         .limit(6)
                         .skip(0)
                         .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
                         .sort('index')
                         .exec()
                         .then(docs => {
                           const lastpostshome = {
                             count: docs.length,
                             posts: docs.map(doc => {
                               return {
                                 title: doc.title,
                                 titleseo:doc.titleseo,
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
                           Ghemassage.find({bestsell:true,name:/ghế/ig})
                               .limit(2)
                               .skip(0)
                               .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                               .exec()
                               .then(docs => {
                                   var ghebestsellmenuhome = {
                                     count: docs.length,
                                     ghemassages: docs.map(doc => {
                                       return {
                                         name: doc.name,
                                         nameseo:doc.nameseo,
                                         status:doc.status,
                                         nganhhang:doc.nganhhang,
                                         trademark:doc.trademark,
                                         price: doc.price,
                                         pricesale:doc.pricesale,
                                         saleoff:doc.price - doc.pricesale,
                                         image: doc.image,
                                         imagedefault:doc.imagedefault,
                                         _id: doc._id,
                                         baohanh:doc.baohanh,
                                         title:doc.title,
                                         description:doc.description,
                                         ogtitle:doc.ogtitle,
                                         ogdescription:doc.ogdescription,
                                         keywords:doc.keywords,
                                         index:doc.index,
                                         request: {
                                           type: "GET",
                                           url: "http://localhost:3000/ghemassages/" + doc._id
                                         }
                                       }
                                     })
                                   };
                                   Ghemassage.find({bestsell:true,nganhhang:"Máy chạy bộ"})
                                       .limit(2)
                                       .skip(0)
                                       .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                       .exec()
                                       .then(docs => {
                                           var maychaybobestsellmenuhome = {
                                             count: docs.length,
                                             ghemassages: docs.map(doc => {
                                               return {
                                                 name: doc.name,
                                                 nameseo:doc.nameseo,
                                                 status:doc.status,
                                                 nganhhang:doc.nganhhang,
                                                 trademark:doc.trademark,
                                                 price: doc.price,
                                                 pricesale:doc.pricesale,
                                                 saleoff:doc.price - doc.pricesale,
                                                 image: doc.image,
                                                 imagedefault:doc.imagedefault,
                                                 _id: doc._id,
                                                 baohanh:doc.baohanh,
                                                 title:doc.title,
                                                 description:doc.description,
                                                 ogtitle:doc.ogtitle,
                                                 ogdescription:doc.ogdescription,
                                                 keywords:doc.keywords,
                                                 index:doc.index,
                                                 request: {
                                                   type: "GET",
                                                   url: "http://localhost:3000/ghemassages/" + doc._id
                                                 }
                                               }
                                             })
                                           };
                                           console.log("ghebestsellmenuhome",ghebestsellmenuhome);
                           res.render('fontend/service',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,poststonghop:poststonghop,layout:'layouts/layout-listservice'});
                    })
                  })
                })
              })
                })
              })
             })
            .catch(err => {
                 console.log(err);
                 res.status(500).json({
                   error: err
                 });
            });
  };
}
exports.posts_get_titleseo=(req,res,next)=>{
  if(req.useragent.isMobile){
    var titleseo= req.params.titleseo;
    Post.find({titleseo:titleseo})
    .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
    .limit(1)
    .sort('index')
    .exec()
    .then(docs => {
      const postsdetail = {
        count: docs.length,
        post: docs.map(doc => {
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

      Post.find({
        titleseo:{$ne:titleseo}
      })
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
      .sort('index')
      .exec()
      .then(docs => {
        const postsfilter = {
          count: docs.length,
          post: docs.map(doc => {
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
        res.render('mobile/service-detail-mb',{postsfilter:postsfilter,postsdetail:postsdetail,layout:'layouts/layoutmobile-service-detail'});

      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  }else{
    var titleseo= req.params.titleseo;
    Post.find({titleseo:titleseo})
    .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
    .limit(1)
    .sort('index')
    .exec()
    .then(docs => {
      const postsdetail = {
        count: docs.length,
        post: docs.map(doc => {
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

      Post.find({
        titleseo:{$ne:titleseo}
      })
      .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
      .sort('index')
      .exec()
      .then(docs => {
        const postsfilter = {
          count: docs.length,
          post: docs.map(doc => {
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
        Trademark.find({nganhhang:"Ghế massage"})
         .limit(8)
         .skip(0)
         .select("_id name nganhhang index")
         .exec()
         .then(docs => {
           const trademarks = {
             count: docs.length,
             trademark: docs.map(doc => {
               return {
                 _id: doc._id,
                 name:doc.name,
                 nganhhang:doc.nganhhang,
                 index:doc.index,
                 request: {
                   type: "GET",
                   url: "http://localhost:3000/ghemassages/" + doc._id
                 }
               };
             })
           };
           Trademark.find({nganhhang:"Máy chạy bộ"})
            .limit(10)
            .skip(0)
            .select("_id name nganhhang index")
            .exec()
            .then(docs => {
              const trademarksmaychaybo = {
                count: docs.length,
                trademark: docs.map(doc => {
                  return {
                    _id: doc._id,
                    name:doc.name,
                    nganhhang:doc.nganhhang,
                    index:doc.index,
                    request: {
                      type: "GET",
                      url: "http://localhost:3000/ghemassages/" + doc._id
                    }
                  };
                })
              };
              Trademark.find({nganhhang:/bếp/i})
               .limit(8)
               .skip(0)
               .select("_id name nganhhang index")
               .exec()
               .then(docs => {
                 const trademarksbep = {
                   count: docs.length,
                   trademark: docs.map(doc => {
                     return {
                       _id: doc._id,
                       name:doc.name,
                       nganhhang:doc.nganhhang,
                       index:doc.index,
                       request: {
                         type: "GET",
                         url: "http://localhost:3000/ghemassages/" + doc._id
                       }
                     };
                   })
                 };
                 Post.find({lastposts:true})
                  .limit(6)
                  .skip(0)
                  .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotposts lastposts service image index")
                  .sort('index')
                  .exec()
                  .then(docs => {
                    const lastpostshome = {
                      count: docs.length,
                      posts: docs.map(doc => {
                        return {
                          title: doc.title,
                          titleseo:doc.titleseo,
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
                    Ghemassage.find({bestsell:true,name:/ghế/ig})
                        .limit(2)
                        .skip(0)
                        .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                        .exec()
                        .then(docs => {
                            var ghebestsellmenuhome = {
                              count: docs.length,
                              ghemassages: docs.map(doc => {
                                return {
                                  name: doc.name,
                                  nameseo:doc.nameseo,
                                  status:doc.status,
                                  nganhhang:doc.nganhhang,
                                  trademark:doc.trademark,
                                  price: doc.price,
                                  pricesale:doc.pricesale,
                                  saleoff:doc.price - doc.pricesale,
                                  image: doc.image,
                                  imagedefault:doc.imagedefault,
                                  _id: doc._id,
                                  baohanh:doc.baohanh,
                                  title:doc.title,
                                  description:doc.description,
                                  ogtitle:doc.ogtitle,
                                  ogdescription:doc.ogdescription,
                                  keywords:doc.keywords,
                                  index:doc.index,
                                  request: {
                                    type: "GET",
                                    url: "http://localhost:3000/ghemassages/" + doc._id
                                  }
                                }
                              })
                            };
                            Ghemassage.find({bestsell:true,nganhhang:"Máy chạy bộ"})
                                .limit(2)
                                .skip(0)
                                .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                .exec()
                                .then(docs => {
                                    var maychaybobestsellmenuhome = {
                                      count: docs.length,
                                      ghemassages: docs.map(doc => {
                                        return {
                                          name: doc.name,
                                          nameseo:doc.nameseo,
                                          status:doc.status,
                                          nganhhang:doc.nganhhang,
                                          trademark:doc.trademark,
                                          price: doc.price,
                                          pricesale:doc.pricesale,
                                          saleoff:doc.price - doc.pricesale,
                                          image: doc.image,
                                          imagedefault:doc.imagedefault,
                                          _id: doc._id,
                                          baohanh:doc.baohanh,
                                          title:doc.title,
                                          description:doc.description,
                                          ogtitle:doc.ogtitle,
                                          ogdescription:doc.ogdescription,
                                          keywords:doc.keywords,
                                          index:doc.index,
                                          request: {
                                            type: "GET",
                                            url: "http://localhost:3000/ghemassages/" + doc._id
                                          }
                                        }
                                      })
                                    };
                                    console.log("postsdetail",postsdetail);
                    res.render('fontend/service-detail',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,postsfilter:postsfilter,postsdetail:postsdetail,layout:"layouts/layout-service-detail"});
                })
              })
            })
          })
            })
          })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  }

}
