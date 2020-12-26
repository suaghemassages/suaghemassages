var express = require('express');
var router=express.Router();
var csrf= require('csurf');
var csrfProtection=csrf();
var passport = require('passport');
router.use(csrfProtection);
router.get('/profile',isLoggedIn,function(req,res,next){
  res.render('backend/customer/profile.ejs')
})
router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
});

router.get('/signup',function(req,res,next){
  var messages=req.flash('error');
 res.render('backend/customer/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,layout:false});
});
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/customer/profile',
    failureRedirect:'/customer/signup',
    failureFlash:true
}));

router.get('/signin',function(req,res,next){
  var messages=req.flash('error');
 res.render('backend/customer/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0,layout:false});
});
router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/customer/profile',
    failureRedirect:'/customer/signup',
    failureFlash:true
}));


 module.exports=router;
 function isLoggedIn(req, res, next) {
     if (req.isAuthenticated()) {
         return next();
     }
     res.redirect('/');
 }

 function notLoggedIn(req, res, next) {
     if (!req.isAuthenticated()) {
         return next();
     }
     res.redirect('/');
 }
