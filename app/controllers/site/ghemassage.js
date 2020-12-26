const mongoose = require("mongoose");
const Ghemassage = require("../../models/ghemassage");
const DateFlashSale = require("../../models/dateflashsale");
const Slidehome = require("../../models/slidehome");
const News = require("../../models/news");
const Service = require("../../models/service");
const Post= require("../../models/posts");
const Trademark= require("../../models/trademark");
const useragent = require('express-useragent');

exports.ghemassages_get_home = (req, res, next) => {
  if(req.useragent.isMobile){
    Slidehome.find()
        .select("_id image title")
        .exec()
        .then(docs => {
            var slidehome = {
              count: docs.length,
              slides: docs.map(doc => {
                return {
                  _id: doc._id,
                  image:doc.image,
                  title:doc.title,
                  request: {
                    type: "GET",
                    url: "http://localhost:3000/date/" + doc._id
                  }
                }
              })
            };
            DateFlashSale.find()
                .select("_id date")
                .exec()
                .then(docs => {
                    var dateflashsale = {
                      count: docs.length,
                      dates: docs.map(doc => {
                        return {
                          _id: doc._id,
                          date:doc.date,
                          request: {
                            type: "GET",
                            url: "http://localhost:3000/date/" + doc._id
                          }
                        }
                      })
                    };
                    var datelocal= new Date(dateflashsale.dates[0].date);
                    var mydate=datelocal.toLocaleString().replace(',',"");
                    console.log("mydatemobile",mydate)
                    Ghemassage.find({flashsale:true})
                        .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                        .exec()
                        .then(docs => {
                            var flashsale = {
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
                                  imagedefault:doc.imagedefault,
                                  image: doc.image,
                                  _id: doc._id,
                                  baohanh:doc.baohanh,
                                  title:doc.title,
                                  description:doc.description,
                                  ogtitle:doc.ogtitle,
                                  ogdescription:doc.ogdescription,
                                  keywords:doc.keywords,
                                  request: {
                                    type: "GET",
                                    url: "http://localhost:3000/ghemassages/" + doc._id
                                  }
                                }
                              })
                            };
                            Ghemassage.find({bestsell:true,name:/ghế/ig})
                                .limit(4)
                                .skip(0)
                                .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                .sort('index')
                                .exec()
                                .then(docs => {
                                    var ghebestsell = {
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
                                    Ghemassage.find({bestsell:true,name:/Máy chạy bộ/ig})
                                        .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                        .exec()
                                        .then(docs => {
                                            var maychaybobestsell = {
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
                                            Ghemassage.find({bestsell:true,name:/Bếp/ig})
                                                .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                                .exec()
                                                .then(docs => {
                                                    var bepbestsell = {
                                                      count: docs.length,
                                                      ghemassages: docs.map(doc => {
                                                        return {
                                                          name: doc.name,
                                                          nameseo:doc.nameseo,
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
                                                    Service.find()
                                                     .limit(6)
                                                     .skip(0)
                                                     .sort('index')
                                                     .select("_id name index")
                                                     .exec()
                                                     .then(docs => {
                                                       const services = {
                                                         count: docs.length,
                                                         service: docs.map(doc => {
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
                                                          News.find({hotnews:true})
                                                           .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image")
                                                           .exec()
                                                           .then(docs => {
                                                             const hotnews = {
                                                               count: docs.length,
                                                               news: docs.map(doc => {
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
                                                                   request: {
                                                                     type: "GET",
                                                                     url: "http://localhost:3000/ghemassages/" + doc._id
                                                                   }
                                                                 };
                                                               })
                                                             };
                                                             res.render('mobile/homemobile',{hotnews:hotnews,lastpostshome:lastpostshome,services:services,bepbestsell:bepbestsell,maychaybobestsell:maychaybobestsell,ghebestsell:ghebestsell,flashsale:flashsale,dateflashsale:mydate,slidehome:slidehome,layout:'layouts/layoutmobile'});
                                                        })
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
    Ghemassage.find({flashsale:true})
        .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
        .exec()
        .then(docs => {
            var flashsale = {
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
                  imagedefault:doc.imagedefault,
                  image: doc.image,
                  _id: doc._id,
                  baohanh:doc.baohanh,
                  title:doc.title,
                  description:doc.description,
                  ogtitle:doc.ogtitle,
                  ogdescription:doc.ogdescription,
                  keywords:doc.keywords,
                  request: {
                    type: "GET",
                    url: "http://localhost:3000/ghemassages/" + doc._id
                  }
                }
              })
            };
            Ghemassage.find({bestsell:true,name:/ghế/ig})
                .limit(4)
                .skip(0)
                .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                .sort('index')
                .exec()
                .then(docs => {
                    var ghebestsell = {
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
                    Ghemassage.find({bestsell:true,name:/Máy chạy bộ/ig})
                        .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                        .exec()
                        .then(docs => {
                            var maychaybobestsell = {
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
                            Ghemassage.find({bestsell:true,name:/Bếp/ig})
                                .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                .exec()
                                .then(docs => {
                                    var bepbestsell = {
                                      count: docs.length,
                                      ghemassages: docs.map(doc => {
                                        return {
                                          name: doc.name,
                                          nameseo:doc.nameseo,
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
                                    DateFlashSale.find()
                                        .select("_id date")
                                        .exec()
                                        .then(docs => {
                                            var dateflashsale = {
                                              count: docs.length,
                                              dates: docs.map(doc => {
                                                return {
                                                  _id: doc._id,
                                                  date:doc.date,
                                                  request: {
                                                    type: "GET",
                                                    url: "http://localhost:3000/date/" + doc._id
                                                  }
                                                }
                                              })
                                            };
                                            var datelocal= new Date(dateflashsale.dates[0].date);
                                            console.log(datelocal);
                                            var mydate=datelocal.toLocaleString().replace(',',"");
                                            console.log("mydate",mydate);
                                            Slidehome.find()
                                                .select("_id image title")
                                                .exec()
                                                .then(docs => {
                                                    var slidehome = {
                                                      count: docs.length,
                                                      slides: docs.map(doc => {
                                                        return {

                                                          _id: doc._id,
                                                          image:doc.image,
                                                          title:doc.title,
                                                          request: {
                                                            type: "GET",
                                                            url: "http://localhost:3000/date/" + doc._id
                                                          }
                                                        }
                                                      })
                                                    };

                                                    News.find({hotnews:true})
                                                     .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image")
                                                     .exec()
                                                     .then(docs => {
                                                       const hotnews = {
                                                         count: docs.length,
                                                         news: docs.map(doc => {
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
                                                             request: {
                                                               type: "GET",
                                                               url: "http://localhost:3000/ghemassages/" + doc._id
                                                             }
                                                           };
                                                         })
                                                       };
                                                       News.find({lastnews:true})
                                                        .limit(6)
                                                        .skip(0)
                                                        .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                        .sort('index')
                                                        .exec()
                                                        .then(docs => {
                                                          const lastnewshome = {
                                                            count: docs.length,
                                                            news: docs.map(doc => {
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
                                                             News.find({lastnews:true})
                                                              .limit(6)
                                                              .skip(0)
                                                              .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                              .sort('index')
                                                              .exec()
                                                              .then(docs => {
                                                                const lastnewshome = {
                                                                  count: docs.length,
                                                                  news: docs.map(doc => {
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
                                                                Service.find()
                                                                 .limit(6)
                                                                 .skip(0)
                                                                 .sort('index')
                                                                 .select("_id name index")
                                                                 .exec()
                                                                 .then(docs => {
                                                                   const services = {
                                                                     count: docs.length,
                                                                     service: docs.map(doc => {
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
                                                                   News.find({lastnews:true})
                                                                    .limit(6)
                                                                    .skip(0)
                                                                    .select("_id title titleseo shortdescription description day ogtitle ogdescription keywords hotnews lastnews slidenews category image index")
                                                                    .sort('index')
                                                                    .exec()
                                                                    .then(docs => {
                                                                      const lastnewshome = {
                                                                        count: docs.length,
                                                                        news: docs.map(doc => {
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
                                                                         Ghemassage.find({name:/ghế massage/ig})
                                                                             .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                                                             .exec()
                                                                             .then(docs => {
                                                                                 var ghemassageall = {
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
                                                                                 Ghemassage.find({nganhhang:"Máy chạy bộ"})
                                                                                     .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                                                                     .exec()
                                                                                     .then(docs => {
                                                                                         var maychayboall = {
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

                                                                                         Ghemassage.find({nganhhang:"Bếp từ, bếp hồng ngoại"})
                                                                                             .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                                                                             .exec()
                                                                                             .then(docs => {
                                                                                                 var bepall = {
                                                                                                   count: docs.length,
                                                                                                   bep: docs.map(doc => {
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
                                                                                                       Ghemassage.find({bestsell:true,name:/ghế/ig})
                                                                                                           .limit(2)
                                                                                                           .skip(0)
                                                                                                           .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index")
                                                                                                           .sort('index')
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
                                                                                                                   .sort('index')
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
                                                                                                                       console.log("ghebestsell",ghebestsell);
                                                                                                               res.render('fontend/index',{trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,bepall:bepall,maychayboall:maychayboall,ghemassageall:ghemassageall,trademarks:trademarks,services:services,lastpostshome:lastpostshome,lastnewshome:lastnewshome,hotnews:hotnews,flashsale:flashsale,ghebestsell:ghebestsell,maychaybobestsell:maychaybobestsell,bepbestsell:bepbestsell,dateflashsale:mydate,slidehome:slidehome,ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome});
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
                                    })
                                })
                        })

                })

      };
};
exports.ghemassages_get_flashsale = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({flashsale:true})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index flashsale")
      .exec()
      .then(docs => {
        const flashsale = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        DateFlashSale.find()
            .select("_id date")
            .exec()
            .then(docs => {
                var dateflashsale = {
                  count: docs.length,
                  dates: docs.map(doc => {
                    return {
                      _id: doc._id,
                      date:doc.date,
                      request: {
                        type: "GET",
                        url: "http://localhost:3000/date/" + doc._id
                      }
                    }
                  })
                };
                var datelocal= new Date(dateflashsale.dates[0].date);
                var mydate=datelocal.toLocaleString().replace(',',"");
                res.render('mobile/listproduct-ghemassage-flashsale-mb',{dateflashsale:mydate,flashsale:flashsale,layout:'layouts/layoutmobile-listproduct-flashsale'});
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else{
       Ghemassage.find({flashsale:true})
        .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index flashsale")
        .exec()
        .then(docs => {
          const flashsale = {
            count: docs.length,
            ghemassages: docs.map(doc => {
              return {
                name: doc.name,
                nameseo:doc.nameseo,
                status:doc.status,
                trademark:doc.trademark,
                price: doc.price,
                pricesale: doc.pricesale,
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
                flashsale:doc.flashsale,
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
                          .sort('index')
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
                      res.render('fontend/listproduct-ghemassage-flashsale',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,flashsale:flashsale,layout:'layouts/layout-listproduct-flashsale'});
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
  }
};
exports.ghemassages_get_bestsell = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({nganhhang:'Ghế massage'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-ghemassage-bestsell-mb',{bestsell:bestsell,layout:'layouts/layoutmobile-listproduct-ghe-bestsell'})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({nganhhang:'Ghế massage'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
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
                        .sort('index')
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
                                .sort('index')
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
                    res.render('fontend/listproduct-ghemassage-bestsell',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,bestsell:bestsell,layout:'layouts/layout-listproduct-ghe-bestsell'})
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
  }
};
exports.ghemassages_get_trademark_boss = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/boss/ig})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageboss = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };

                    res.render('mobile/listproduct-ghemassage-boss-mb',{ghemassagelist:ghemassageboss,layout:"layouts/layoutmobile-listproduct-ghe-trademark"});

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/boss/ig})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageboss = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-boss',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassageboss,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_okia = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/okia/ig})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageokia = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-ghemassage-okia-mb',{ghemassagelist:ghemassageokia,layout:"layouts/layoutmobile-listproduct-ghe-trademark"});

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/okia/ig})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageokia = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-okia',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassageokia,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_poogsan = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/poogsan/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagepoogsan = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-ghemassage-poogsan-mb',{ghemassagelist:ghemassagepoogsan,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/poogsan/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagepoogsan = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-poogsan',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassagepoogsan,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_maxcare = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/maxcare/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagemaxcare = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-ghemassage-maxcare-mb',{ghemassagelist:ghemassagemaxcare,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/maxcare/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagemaxcare = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-maxcare',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassagemaxcare,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_osim = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/osim/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageosim = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-ghemassage-osim-mb',{ghemassagelist:ghemassageosim,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/osim/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageosim = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-osim',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassageosim,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_inada = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/inada/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageinada = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-ghemassage-inada-mb',{ghemassagelist:ghemassageinada,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/inada/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassageinada = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-inada',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassageinada,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.ghemassages_get_trademark_drcare = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/drcare/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedrcare = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-ghemassage-drcare-mb',{ghemassagelist:ghemassagedrcare,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/drcare/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedrcare = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-drcare',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassagedrcare,layout:'layouts/layout-listproduct-ghe-trademark'})
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
      });;
  }
};
exports.ghemassages_get_trademark_panasonic = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/panasonic/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagepanasonic = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-ghemassage-panasonic-mb',{ghemassagelist:ghemassagepanasonic,layout:"layouts/layoutmobile-listproduct-ghe-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/panasonic/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagepanasonic = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-ghemassage-panasonic',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:ghemassagepanasonic,layout:'layouts/layout-listproduct-ghe-trademark'})
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
  }
};
exports.maychaybo_get_bestsell = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({bestsell:true,nganhhang:"Máy chạy bộ"})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .limit(4)
      .skip(0)
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-maychaybo-bestsell-mb',{bestsell:bestsell,layout:'layouts/layoutmobile-listproduct-maychaybo-bestsell'});

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({bestsell:true,nganhhang:"Máy chạy bộ"})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .limit(4)
      .skip(0)
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-bestsell',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,bestsell:bestsell,layout:'layouts/layout-listproduct-maychaybo-bestsell'})
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
  }
};
exports.maychaybo_get_trademark_yuki = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Yuki/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychayboyuki = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-maychaybo-yuki-mb',{ghemassagelist:maychayboyuki,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Yuki/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychayboyuki = {
          count: docs.length,
          yuki: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-yuki',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychayboyuki,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_like = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Like/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybolike = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-maychaybo-like-mb',{ghemassagelist:maychaybolike,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Like/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybolike = {
          count: docs.length,
          like: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-like',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybolike,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_takasha = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Takasha/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybotakasha = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-maychaybo-takasha-mb',{ghemassagelist:maychaybotakasha,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Takasha/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybotakasha = {
          count: docs.length,
          like: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-takasha',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybotakasha,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_max = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Max/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybomax = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-maychaybo-max-mb',{ghemassagelist:maychaybomax,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:"Max"})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybomax = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-max',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybomax,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_goodforsalas = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Goodfor/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybogoodforsalas = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-maychaybo-goodforsalas-mb',{ghemassagelist:maychaybogoodforsalas,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Goodfor/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybogoodforsalas = {
          count: docs.length,
          goodforsalas: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-goodforsalas',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybogoodforsalas,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_xapon = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Xapon/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychayboxapon = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-maychaybo-xapon-mb',{ghemassagelist:maychayboxapon,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Xapon/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychayboxapon = {
          count: docs.length,
          xapon: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-xapon',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychayboxapon,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_gym = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Gym/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybogym = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-maychaybo-gym-mb',{ghemassagelist:maychaybogym,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Gym/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybogym = {
          count: docs.length,
          gym: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-gym',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybogym,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.maychaybo_get_trademark_kingport = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({trademark:/Kingport/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybokingport = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
          res.render('mobile/listproduct-maychaybo-kingport-mb',{ghemassagelist:maychaybokingport,layout:"layouts/layoutmobile-listproduct-maychaybo-trademark"})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({trademark:/Kingport/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var maychaybokingport = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              trademark:doc.trademark,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-maychaybo-kingport',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagelist:maychaybokingport,layout:'layouts/layout-listproduct-maychaybo-trademark'})
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
  }
};
exports.bep_get_bestsell = (req, res, next) => {
  if(req.useragent.isMobile){
    Ghemassage.find({bestsell:true,name:/bếp/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
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
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-bep-bestsell-mb',{bestsell:bestsell,layout:'layouts/layoutmobile'})

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }else{
    Ghemassage.find({bestsell:true,name:/bếp/ig})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
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
                    res.render('fontend/listproduct-bep-bestsell',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,bestsell:bestsell})
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
  }
};
exports.ghemassages_get_ghemassage_timkiemsanpham = (req, res, next) => {
    if(req.useragent.isMobile){
      const nameseo = req.params.ghemassagenameseo;
      Ghemassage.find({nameseo:nameseo})
        .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
        .exec()
        .then(docs => {
          var ghemassagedetail={
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

          Ghemassage.find({
            $and: [
              { pricesale: { $lte: docs[0].pricesale + 1000000 } },
             { pricesale: { $gt:docs[0].pricesale - 1000000 }  }
            ]
            })
            .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
            .exec()
            .then(docs => {
              var dongmucgia={
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
            res.render('mobile/ghemassage-detail-mb',{dongmucgia:dongmucgia,ghemassagedetail:ghemassagedetail,layout:"layouts/layoutmobile-product-detail"});
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    }
    else{
      const nameseo = req.params.ghemassagenameseo;
      Ghemassage.find({nameseo:nameseo})
        .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
        .exec()
        .then(docs => {
          var ghemassagedetail={
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
                  Ghemassage.find({
                    $and: [
                      { pricesale: { $lte: docs[0].pricesale + 1000000 } },
                     { pricesale: { $gt:docs[0].pricesale - 1000000 }  }
                    ]
                    })
                    .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
                    .exec()
                    .then(docs => {
                      var dongmucgia={
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
                                      res.render('fontend/ghemassage-detail',{dongmucgia:dongmucgia,ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagedetail:ghemassagedetail,layout:'layouts/layout-product-detail'});
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

};
exports.ghemassages_get_ghemassageKeyword = (req, res, next) => {
  if(req.useragent.isMobile){
    var reg=req.params.id;
    var keyword=reg.replace("keywords=","");
    console.log("reg la:",reg);
      console.log("keyword la:",keyword);
    Ghemassage.find({name:{ '$regex' : keyword, '$options' : 'i' } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.render('mobile/listproduct-keyword-mb',{bestsell:bestsell,layout:"layouts/layoutmobile"});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else{
    var reg=req.params.id;
    var keyword=reg.replace("keywords=","");
    console.log("reg la:",reg);
      console.log("keyword la:",keyword);
    Ghemassage.find({name:{ '$regex' : keyword, '$options' : 'i' } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var bestsell = {
          count: docs.length,
          ghemassages: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
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
                    res.render('fontend/listproduct-ghemassage-bestsell',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,bestsell:bestsell});
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
  }
};
exports.ghemassages_get_ghemassagenameseo = (req, res, next) => {
  if(req.useragent.isMobile){
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Ghế massage",
          $and: [
            { pricesale: { $lte: docs[0].pricesale + 500000 } },
           { pricesale: { $gt:docs[0].pricesale - 500000 }  }
          ]
          })
          .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
          .exec()
          .then(docs => {
            var dongmucgia={
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
            res.render('mobile/ghemassage-detail-mb',{dongmucgia:dongmucgia,ghemassagedetail:ghemassagedetail,layout:"layouts/layoutmobile-product-detail"});
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }else{
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell nganhhang")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Ghế massage",
                    $and: [
                      { pricesale: { $lte: docs[0].pricesale + 1000000 } },
                     { pricesale: { $gt:docs[0].pricesale - 1000000 }  }
                    ]
                    })
                    .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
                    .exec()
                    .then(docs => {
                      var dongmucgia={
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
                                       console.log('ghemassagedetail',ghemassagedetail);
                                       res.render('fontend/ghemassage-detail',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagedetail:ghemassagedetail,dongmucgia:dongmucgia,layout:'layouts/layout-product-detail'});
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
};
exports.ghemassages_get_ghemassagenameseo_maychaybo = (req, res, next) => {
  if(req.useragent.isMobile){
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Ghế massage",
          $and: [
            { pricesale: { $lte: docs[0].pricesale + 500000 } },
           { pricesale: { $gt:docs[0].pricesale - 500000 }  }
          ]
          })
          .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
          .exec()
          .then(docs => {
            var dongmucgia={
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
        res.render('mobile/maychaybo-detail-mb',{dongmucgia:dongmucgia,ghemassagedetail:ghemassagedetail,layout:"layouts/layoutmobile-product-detail"});
        })
      })
  }else{
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Máy chạy bộ",
                        $and: [
                          { pricesale: { $lte:docs[0].pricesale + 1000000 } },
                         { pricesale: { $gt:docs[0].pricesale - 1000000 }  }
                        ]
                      })
                    .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
                    .exec()
                    .then(docs => {
                      var dongmucgia={
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
                                                            console.log('ghemassagedetail',ghemassagedetail);
                                        res.render('fontend/ghemassage-detail-maychaybo',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,dongmucgia:dongmucgia,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagedetail:ghemassagedetail,layout:'layouts/layout-product-detail'});
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
};
exports.ghemassages_get_ghemassagenameseo_sanpham_flashsale = (req, res, next) => {
  if(req.useragent.isMobile){
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Ghế massage",
          $and: [
            { pricesale: { $lte:docs[0].pricesale + 1000000 } },
           { pricesale: { $gt:docs[0].pricesale - 1000000 }  }
          ]
          })
          .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
          .exec()
          .then(docs => {
            var dongmucgia={
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
          res.render('mobile/san-pham-giam-gia-flashsale-detail-mb',{dongmucgia:dongmucgia,ghemassagedetail:ghemassagedetail,layout:"layouts/layoutmobile-product-detail"});
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }else{
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
                Ghemassage.find({
                  $and: [
                    { pricesale: { $lte: docs[0].pricesale + 500000 } },
                   { pricesale: { $gt:docs[0].pricesale - 500000 }  }
                  ]
                  })
                  .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
                  .exec()
                  .then(docs => {
                    var dongmucgia={
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
                    res.render('fontend/ghemassage-detail-sanpham-flashsale',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,dongmucgia:dongmucgia,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagedetail:ghemassagedetail,layout:'layouts/layout-product-detail'});
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
};
exports.ghemassages_get_ghemassagenameseo_bep = (req, res, next) => {
  if(req.useragent.isMobile){
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
        Ghemassage.find({nganhhang:"Bếp từ, bếp hồng ngoại",
          $and: [
            { pricesale: { $lte: docs[0].pricesale + 500000 } },
           { pricesale: { $gt:docs[0].pricesale - 500000 }  }
          ]
          })
          .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
          .exec()
          .then(docs => {
            var dongmucgia={
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

          res.render('mobile/bep-detail-mb',{dongmucgia:dongmucgia,ghemassagedetail:ghemassagedetail,layout:"layouts/layoutmobile-product-detail"});
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }else{
    const nameseo = req.params.ghemassagenameseo;
    Ghemassage.find({nameseo:nameseo})
      .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .exec()
      .then(docs => {
        var ghemassagedetail={
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
                Ghemassage.find({nganhhang:"Ghế massage",
                  $and: [
                    { pricesale: { $lte: docs[0].pricesale + 500000 } },
                   { pricesale: { $gt:docs[0].pricesale - 500000 }  }
                  ]
                  })
                  .select("_id name nameseo status trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
                  .exec()
                  .then(docs => {
                    var dongmucgia={
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
                    res.render('fontend/ghemassage-detail-bep',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,dongmucgia:dongmucgia,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,ghemassagedetail:ghemassagedetail,layout:'layouts/layout-product-detail'});
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

};
exports.ghemassages_get_search=(req, res, next) =>{
  var keyword=req.body.keyword;
  Ghemassage.find({name:{ '$regex' : keyword, '$options' : 'i' } })
    .limit(6)
    .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
    .exec()
    .then(docs => {
      var productall = {
        count: docs.length,
        product: docs.map(doc => {
          return {
            name: doc.name,
            nameseo:doc.nameseo,
            status:doc.status,
            nganhhang:doc.nganhhang,
            trademark:doc.trademark,
            price: doc.price,
            pricesale: doc.pricesale,
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
            flashsale:doc.flashsale,
            bestsell:doc.bestsell,
            request: {
              type: "GET",
              url: "http://localhost:3000/ghemassages/" + doc._id
            }
          };
        })
      };
      res.send(productall);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.ghemassages_bestsell_sort=(req,res,next)=>{
  var sort=req.body.sort;
  var sortprice=req.body.sortprice;

  if(sort=="asc"){
    Ghemassage.find({nganhhang:'Ghế massage'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellasc = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellasc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sort=="desc"){
    Ghemassage.find({nganhhang:'Ghế massage'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('-pricesale')
      .exec()
      .then(docs => {
        var bestselldesc = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestselldesc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sort=="sale"){
    Ghemassage.find({nganhhang:'Ghế massage'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('index')
      .exec()
      .then(docs => {
        var bestsellindex = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellindex);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  if(sortprice=="duoi5tr"){
    Ghemassage.find({nganhhang:'Ghế massage',pricesale: { $lt: 5000000 } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sortprice=="duoi10tr"){
    Ghemassage.find({nganhhang:'Ghế massage',pricesale: { $lt: 10000000,$gte:5000000 } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sortprice=="tren10tr"){
    Ghemassage.find({nganhhang:'Ghế massage',pricesale: { $gte: 10000000 } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
};
exports.maychaybo_bestsell_sort=(req,res,next)=>{
  var sort=req.body.sort;
  var sortprice=req.body.sortprice

  if(sort=="asc"){
    Ghemassage.find({nganhhang:'Máy chạy bộ'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellasc = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellasc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sort=="desc"){
    Ghemassage.find({nganhhang:'Máy chạy bộ'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('-pricesale')
      .exec()
      .then(docs => {
        var bestselldesc = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestselldesc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sort=="sale"){
    Ghemassage.find({nganhhang:'Máy chạy bộ'})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('index')
      .exec()
      .then(docs => {
        var bestsellindex = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellindex);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  if(sortprice=="duoi5tr"){
    Ghemassage.find({nganhhang:"Máy chạy bộ",pricesale:{$lt:5000000}})
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")

      .exec()
      .then(docs => {
        var mcbbestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(mcbbestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sortprice=="duoi10tr"){
    Ghemassage.find({nganhhang:'Máy chạy bộ',pricesale: { $lte: 10000000,$gte:5000000 } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  else if(sortprice=="tren10tr"){
    Ghemassage.find({nganhhang:'Máy chạy bộ',pricesale: { "$gte": 10000000 } })
      .select("_id name nameseo status nganhhang trademark image imagedefault price pricesale baohanh title description ogtitle ogdescription keywords index  bestsell")
      .sort('pricesale')
      .exec()
      .then(docs => {
        var bestsellprice = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              nameseo:doc.nameseo,
              status:doc.status,
              nganhhang:doc.nganhhang,
              trademark:doc.trademark,
              price: doc.price,
              pricesale: doc.pricesale,
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
              flashsale:doc.flashsale,
              bestsell:doc.bestsell,
              request: {
                type: "GET",
                url: "http://localhost:3000/ghemassages/" + doc._id
              }
            };
          })
        };
        res.send(bestsellprice);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
};
