const express = require('express');
const path = require('path');
var useragent = require('express-useragent');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require ('mongoose');
const ghemassageRouter = require('./app/routers/ghemassage');
const nhanbantinRouter = require('./app/routers/nhanbantin');
const GhemassagesController = require('./app/controllers/site/ghemassage');
const ghemassageRouterSite = require('./app/routersSite/ghemassage');
const dateRouter = require('./app/routers/dateflashsale');
const slidehomeRouter=require('./app/routers/slidehome');
const bannernewsRouter=require('./app/routers/bannernews');
const categoryRouter=require('./app/routers/category');
const serviceRouter=require('./app/routers/service');
const postsRouterSite=require('./app/routersSite/posts');
const newsRouter=require('./app/routers/news');
const newsRouterSite=require('./app/routersSite/news');
const postsRouter=require('./app/routers/posts');
const trademarkRouter=require('./app/routers/trademark');
const nganhhangRouter=require('./app/routers/nganhhang');
const userRouter = require('./app/routers/user');
const orderRouter = require('./app/routers/order');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const connect = require('connect');
const User = require("./app/models/user");
const customerRouter=require('./app/routers/customer');
var Cart = require('./app/models/cart');
const cartRouter = require('./app/routersSite/cart');
const Ghemassage = require("./app/models/ghemassage");
var compression = require('compression');
var app = express();
app.use(compression());
//useragent
app.use(useragent.express());
//passport
//const fs = require ('fs');
var Passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var LocalStrategy= require('passport-local').Strategy;
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'mysecret',
   resave: false,
   saveUninitialized: false,
   store: new MongoStore({mongooseConnection:mongoose.connection}),
   cookie:{
  maxAge:180 * 60 *10000 //100 phut
}}));
app.use(flash());
app.use(Passport.initialize());
app.use(Passport.session());
//endpassport.
mongoose.connect('mongodb://chothueghemassage:ghemassage123@ds253804.mlab.com:53804/chothueghemassage',{useMongoClient:true});


mongoose.Promise = global.Promise;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app/views/'));
//render scss sang css
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/assest/css/sass'),
    dest: path.join(__dirname, 'public/assest/css'),
    debug: true,
  prefix: '/css'
}));
//end sass
app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session =req.session;
  next();
})
app.use(expressLayouts);
//set default layout
app.set('layout', path.join(__dirname,'app/views/layouts/layout'));
// set custom layout
app.get('/admin/cms',(req,res)=>{res.render('backend/home/cms',{layout:'layouts/layoutadmin'})});
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname, 'public/assest/')));
app.use( express.static(path.join(__dirname, 'public/assest/image')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/trademark',trademarkRouter);
app.use('/ghemassage',ghemassageRouter);
app.use('/nhanbantin',nhanbantinRouter);
app.use('/san-pham',ghemassageRouterSite);
app.use('/',ghemassageRouterSite);

app.use('/date',dateRouter);
app.use('/slidehome',slidehomeRouter);
app.use('/bannernews',bannernewsRouter);
app.use('/category',categoryRouter);
app.use('/news',newsRouter);
app.use('/tin-tuc',newsRouterSite);
app.use('/',postsRouterSite);
app.use('/posts',postsRouter);
app.use('/service',serviceRouter);
app.use('/nganhhang',nganhhangRouter);
app.use('/cart',cartRouter);
app.use('/user',userRouter);
app.use('/orders', orderRouter);
app.use('/customer',customerRouter);
//upload image = ckeditor
app.use(require('skipper')());
var browser = require('file-manager-js');
app.all('/browser/browse', browser.browse);
app.post('/uploader/upload', browser.upload);
//end upload image ckeditor
//begin Passport
app.get('/admin/loginok',(req,res)=>{res.render('backend/login/loginok')});
app.get('/admin/login',(req,res)=>res.render('backend/login/login',{layout:false}));
app.post('/admin/login',Passport.authenticate('local',{
    failureRedirect:'/admin/login',
    successRedirect:'/admin/cms'
}));
Passport.use(new LocalStrategy(
    (username,password,done)=>{
      User.find()
      .exec()
      .then((db)=>{
          const userRecord = db.find((user)=>user.username==username);
          if(userRecord && userRecord.password==password){
            return done(null,userRecord)
          }else{
            return done(null,false);
          }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  ));
  Passport.serializeUser((user,done)=>{
    done(null,user.username)
  })
  Passport.deserializeUser((name,done)=>{
    User.find().exec().then((db)=>{
      const userRecord=db.find(user=>user.username==name);
      if(userRecord){
        return done(null,userRecord);
      }
      else{
        return done(null,false);
      }
    })
  })
  //passport sign up signin
  require('./app/config/passport');

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('server is listening on port:',port)
})
