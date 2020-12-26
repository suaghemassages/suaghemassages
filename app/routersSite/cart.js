const express =  require ('express')
const router = express.Router();
const Ghemassage = require("../models/ghemassage");
const Post= require("../models/posts");
const Trademark= require("../models/trademark");
var Cart = require('../models/cart');
var Order = require('../models/order');
var nodemailer= require('nodemailer');
var hbs= require('nodemailer-express-handlebars');
 var bodyParser = require('body-parser');
router.get('/add-to-cart/:id', function(req, res, next) {
  if(req.useragent.isMobile){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Ghemassage.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart/shopping-cart')
    });
  }
  else{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Ghemassage.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart/shopping-cart')
    });
  }

});
router.get('/shopping-cart/',function(req,res,next){
  if(req.useragent.isMobile){
    if (!req.session.cart) {
        return res.render('mobile/shopping-cart-mb', {products: null,layout:'layouts/layoutmobile'});
    }
     var cart = new Cart(req.session.cart);
                 res.render('mobile/shopping-cart-mb', {products: cart.generateArray(), totalPrice: cart.totalPrice,layout:'layouts/layoutmobile'});
                 next();
  }else{
    if (!req.session.cart) {
        return res.render('fontend/shopping-cart', {products: null});
    }
     var cart = new Cart(req.session.cart);
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
                 res.render('fontend/shopping-cart', {ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,products: cart.generateArray(), totalPrice: cart.totalPrice});
                 next();
              })
            })
          })
        })
          })
       })
  }
});
router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart/shopping-cart');
});
router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart/shopping-cart');
});
router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.addOne(productId);
    req.session.cart = cart;
    res.redirect('/cart/shopping-cart');
});
//thanh toan offline
router.get('/checkout', function(req, res, next) {
    if(req.useragent.isMobile){
      if (!req.session.cart) {
          return res.redirect('/cart/shopping-cart');
      }
      var cart = new Cart(req.session.cart);
      var errMsg = req.flash('error')[0];
      res.render('mobile/checkout-mb', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg,layout:'layouts/layoutmobile'});
    }else{
      if (!req.session.cart) {
          return res.redirect('/cart/shopping-cart');
      }
      var cart = new Cart(req.session.cart);
      var errMsg = req.flash('error')[0];
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
                  res.render('fontend/checkout', {ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
            })
          })
        })
      })
        })
      })
    }
});
router.post('/checkout', function(req, res, next) {
  if(req.useragent.isMobile){
    if (!req.session.cart) {
        return res.redirect('/cart/shopping-cart');
    }
    var address=req.body.address,
    name= req.body.name,
    note=req.body.note,
    phone=req.body.phone,
    email=req.body.email;
    var cart = new Cart(req.session.cart);
    var order = new Order({
        cart: cart,
        address: address,
        name: name,
        note:note,
        phone:phone,
        email:email
    });
    var cartt=cart.generateArray();
    var output="";
    for(var i=0;i<cartt.length;i++){
      output+= cartt[i].item.name  +" - "
    }
    order.save(function(err, result) {
        req.flash('success', 'Đăng ký mua thành công');
        req.session.cart = null;
        console.log(order);
        console.log("giohang%s",cart);
        var successMsg = req.flash('success')[0];
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'ghemassagecentre@gmail.com',
                pass: 'Vinh@1234'
            }
        });
        transporter.use('compile',hbs({
          viewPath:'app/views/fontend/',
          extName:'.ejs'
        }))
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Ghemassagecentre <ghemassagecentre@gmail.com>',
            to: email,
            subject: 'Bạn đã đặt hàng thành công',
             template:'templateMailer',
             context:{
               address,
               name,
               note,
               phone,
               email,
               output
             }
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' +  info.response);
            }
        });
          res.render('mobile/checkoutInfo-mb',{successMsg: successMsg, noMessages: !successMsg,order:order,cart:cart.generateArray(),layout:'layouts/layoutmobile'});
    });
  }else{
    if (!req.session.cart) {
        return res.redirect('/cart/shopping-cart');
    }
    var address=req.body.address,
    name= req.body.name,
    note=req.body.note,
    phone=req.body.phone,
    email=req.body.email;

    var cart = new Cart(req.session.cart);
    var order = new Order({
        cart: cart,
        address: address,
        name: name,
        note:note,
        phone:phone,
        email:email
    });
    var cartt=cart.generateArray();
    var output="";
    for(var i=0;i<cartt.length;i++){
      output+= cartt[i].item.name  +" - "
    }

    console.info("output la:",output);
    console.info("email:",email);
    order.save(function(err, result) {
        req.flash('success', 'Đăng ký mua thành công');
        req.session.cart = null;
        // res.redirect('/');
        console.log(order);
        console.log("giohang%s",cart);
        var successMsg = req.flash('success')[0];
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'ghemassagecentre@gmail.com',
                pass: 'Vinh@1234'
            }
        });
        transporter.use('compile',hbs({
          viewPath:'app/views/fontend/',
          extName:'.ejs'
        }))
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Ghemassagecentre <ghemassagecentre@gmail.com>',
            to: email,
            subject: 'Bạn đã đặt hàng thành công',
             template:'templateMailer',
             context:{
               address,
               name,
               note,
               phone,
               email,
               output
             }

        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);

            } else {
                console.log('Message sent: ' +  info.response);
            }
        });
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
                    res.render('fontend/checkoutInfo',{ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,successMsg: successMsg, noMessages: !successMsg,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,order:order,cart:cart.generateArray()});
                })
              })
            })
          })
            })
        })
    });
  }
});
//end thanh toan offline
//thanh toan online visa
router.get('/checkoutOnline', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
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
                res.render('fontend/checkoutOnline', {ghebestsellmenuhome:ghebestsellmenuhome,maychaybobestsellmenuhome:maychaybobestsellmenuhome,lastpostshome:lastpostshome,trademarksbep:trademarksbep,trademarksmaychaybo:trademarksmaychaybo,trademarks:trademarks,total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
          })
        })
      })
    })
      })
    })
});
router.post('/checkoutOnline', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_KWHq6vVU1wFDupU5IDKcqG4u"
    );

    stripe.charges.create({
        amount: cart.totalPrice ,
        currency: "vnd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/cart/checkoutOnline');
        }
        var order = new Order({
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/ghe-massage');
        });
    });
});
//end thanh toan offline
module.exports = router;
