const mongoose = require("mongoose");
const News = require("../../models/news");
const Post = require("../../models/posts");
const Category= require("../../models/category");
const Bannernews= require("../../models/bannernews");
const Trademark=require("../../models/trademark");
const Ghemassage=require("../../models/ghemassage");
exports.news_get_home = (req, res, next) => {
  if(req.useragent.isMobile){
    News.find({slidenews:true})
         .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
         .limit(70)
         .sort('index')
         .exec()
         .then(docs => {
           const slidenews = {
             count: docs.length,
             slide: docs.map(doc => {
               return {
                 title: doc.title,
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
           News.find({lastnews:true})
                .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                .limit(40)
                .sort('index')
                .exec()
                .then(docs => {
                  const tinnoibat = {
                    count: docs.length,
                    new: docs.map(doc => {
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
                  Category.find()
                       .select("_id name index")
                       .limit(60)
                       .sort('index')
                       .exec()
                       .then(docs => {
                         const categorys = {
                           count: docs.length,
                           category: docs.map(doc => {
                             return {
                               _id: doc._id,
                               name:doc.name,
                               index:doc.index,
                               request: {
                                 type: "GET",
                                 url: "http://localhost:3000/ghemassages/" + doc._id
                               }
                             };
                           })
                         };
                         News.find({category:"Tin khuyến mại"})
                              .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                              .limit(40)
                              .sort('index')
                              .exec()
                              .then(docs => {
                                const tinkhuyenmai = {
                                  count: docs.length,
                                  new: docs.map(doc => {
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
                                News.find({category:"Thông tin tiêu dùng"})
                                     .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                     .limit(40)
                                     .sort('index')
                                     .exec()
                                     .then(docs => {
                                       const tintieudung = {
                                         count: docs.length,
                                         new: docs.map(doc => {
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
                                       News.find({category:"Tin tức dịch vụ"})
                                            .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                            .limit(40)
                                            .sort('index')
                                            .exec()
                                            .then(docs => {
                                              const tindichvu = {
                                                count: docs.length,
                                                new: docs.map(doc => {
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
                                              News.find({category:"Sức khỏe"})
                                                   .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                   .limit(40)
                                                   .sort('index')
                                                   .exec()
                                                   .then(docs => {
                                                     const tinsuckhoe = {
                                                       count: docs.length,
                                                       new: docs.map(doc => {
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
                                                     News.find({category:"Mẹo vặt"})
                                                          .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                          .limit(40)
                                                          .sort('index')
                                                          .exec()
                                                          .then(docs => {
                                                            const tinmeovat = {
                                                              count: docs.length,
                                                              new: docs.map(doc => {
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
                                                            res.render('mobile/news-mb',{tinmeovat:tinmeovat,tinsuckhoe:tinsuckhoe,tindichvu:tindichvu,tintieudung:tintieudung,tinkhuyenmai:tinkhuyenmai,categorys:categorys,tinnoibat:tinnoibat,slidenews:slidenews,layout:'layouts/layoutmobile-listnews'});

                              })
                          })
                        })
                      })
                  })

              })
         })
      })
  }
  else{
        News.find()
             .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
             .limit(60)
             .sort('-index')
             .exec()
             .then(docs => {
               const newstonghop = {
                 count: docs.length,
                 new: docs.map(doc => {
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
                     hotnews:doc.hotnews,
                     lastnews:doc.lastnews,
                     slidenews:doc.slidenews,
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
               News.find({slidenews:true})
                    .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                    .limit(70)
                    .sort('index')
                    .exec()
                    .then(docs => {
                      const slidenews = {
                        count: docs.length,
                        slide: docs.map(doc => {
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
                      News.find({lastnews:true})
                           .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                           .limit(40)
                           .sort('index')
                           .exec()
                           .then(docs => {
                             const tinnoibat = {
                               count: docs.length,
                               new: docs.map(doc => {
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
                             Category.find()
                                  .select("_id name index")
                                  .limit(60)
                                  .sort('index')
                                  .exec()
                                  .then(docs => {
                                    const categorys = {
                                      count: docs.length,
                                      category: docs.map(doc => {
                                        return {
                                          _id: doc._id,
                                          name:doc.name,
                                          index:doc.index,
                                          request: {
                                            type: "GET",
                                            url: "http://localhost:3000/ghemassages/" + doc._id
                                          }
                                        };
                                      })
                                    };
                                    News.find({category:"Tin khuyến mại"})
                                         .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                         .limit(40)
                                         .sort('index')
                                         .exec()
                                         .then(docs => {
                                           const tinkhuyenmai = {
                                             count: docs.length,
                                             new: docs.map(doc => {
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
                                           News.find({category:"Thông tin tiêu dùng"})
                                                .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                .limit(40)
                                                .sort('index')
                                                .exec()
                                                .then(docs => {
                                                  const tintieudung = {
                                                    count: docs.length,
                                                    new: docs.map(doc => {
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
                                                  News.find({category:"Tin tức dịch vụ"})
                                                       .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                       .limit(100)
                                                       .sort('index')
                                                       .exec()
                                                       .then(docs => {
                                                         const tindichvu = {
                                                           count: docs.length,
                                                           new: docs.map(doc => {
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
                                                         News.find({category:"Sức khỏe"})
                                                              .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                              .limit(40)
                                                              .sort('index')
                                                              .exec()
                                                              .then(docs => {
                                                                const tinsuckhoe = {
                                                                  count: docs.length,
                                                                  new: docs.map(doc => {
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
                                                                News.find({category:"Mẹo vặt"})
                                                                     .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                                     .limit(40)
                                                                     .sort('index')
                                                                     .exec()
                                                                     .then(docs => {
                                                                       const tinmeovat = {
                                                                         count: docs.length,
                                                                         new: docs.map(doc => {
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
                                                                       Bannernews.find()
                                                                            .select("_id image index")
                                                                            .limit(40)
                                                                            .exec()
                                                                            .then(docs => {
                                                                              const bannernews = {
                                                                                count: docs.length,
                                                                                banner: docs.map(doc => {
                                                                                  return {
                                                                                    _id: doc._id,
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
                                                                                          res.render('fontend/news',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,bannernews:bannernews,tinmeovat:tinmeovat,tinsuckhoe:tinsuckhoe,tindichvu:tindichvu,tintieudung:tintieudung,tinkhuyenmai:tinkhuyenmai,categorys:categorys,tinnoibat:tinnoibat,newstonghop:newstonghop,slidenews:slidenews,layout:'layouts/layout-listnews'})
                                                                                      })
                                                                                    })
                                                                                  })
                                                                                })
                                                                                 })
                                                                              })
                                                                           })
                                                                    })
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
                 res.status(500).json({
                   error: err
                 });
            });
  };
}
exports.news_get_titleseo=(req,res,next)=>{
  if(req.useragent.isMobile){
    const titleseo= req.params.titleseo;
    const titleseolienquan=titleseo.split("-");
    var regex = titleseolienquan.join("|");
    console.log("Regex",regex);
    console.log("titleseolienquan",titleseolienquan);
    News.find({titleseo:titleseo},function(err,doc){
      if(!doc[0].view){
        res.redirect('/tin-tuc');
      }
      else{
        doc[0].view+=1;
        doc[0].save();
      }
    })
    News.find({titleseo:titleseo})
    .select("_id title titleseo view shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
    .sort('-index')
    .exec()
    .then(docs => {
      const newsdetail = {
        count: docs.length,
        new: docs.map(doc => {
          return {
            title: doc.title,
            titleseo:doc.titleseo,
            view:doc.view + 1,
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
      News
      .find({
        titleseo:{
          "$regex": regex,
          "$options": "i"
        }
      })
      .select("_id title titleseo view shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
      .sort('-index')
      .exec()
      .then(docs => {
        const tinlienquan = {
          count: docs.length,
          new: docs.map(doc => {
            return {
              title: doc.title,
              titleseo:doc.titleseo,
              view:doc.view + 1,
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
        res.render('mobile/news-detail-mb',{tinlienquan:tinlienquan,newsdetail:newsdetail,layout:'layouts/layoutmobile-news-detail'});
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  }
  else{
    const titleseo= req.params.titleseo;
    const titleseolienquan=titleseo.split("-");
    var regex = titleseolienquan.join("|");
    console.log("Regex",regex);
    console.log("titleseolienquan",titleseolienquan);
    News.find({titleseo:titleseo},function(err,doc){
      if(!doc[0].view){
        //res.redirect('/tin-tuc');
        doc[0].view+=1;
        doc[0].save();
      }
      else{
        doc[0].view+=1;
        doc[0].save();
      }
    })
    News.find({titleseo:titleseo})
    .select("_id title titleseo view shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
    .sort('-index')
    .exec()
    .then(docs => {
      const newsdetail = {
        count: docs.length,
        new: docs.map(doc => {
          return {
            title: doc.title,
            titleseo:doc.titleseo,
            view:doc.view + 1,
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
      News
      .find({
        titleseo:{
          "$regex": regex,
          "$options": "i"
        }
      })
      .select("_id title titleseo view shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
      .sort('-index')
      .exec()
      .then(docs => {
        const tinlienquan = {
          count: docs.length,
          new: docs.map(doc => {
            return {
              title: doc.title,
              titleseo:doc.titleseo,
              view:doc.view + 1,
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
                    res.render('fontend/news-detail',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,tinlienquan:tinlienquan,newsdetail:newsdetail,layout:'layouts/layout-news-detail'});
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
