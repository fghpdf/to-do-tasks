var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

var model = require('../database/model');
var mail = require('../push/email');

/* GET home page. */
//对访问进行拦截，若没有登陆，则不能进入项目管理页面
router.all('/', isLoggedIn);
router.all('/user', isLoggedIn);

router.get('/', function(req, res) {
  res.redirect(303, '/user');
});

router.get('/login', function(req, res) {
  res.render('login', { title: '登陆'});
});

router.post('/login', function(req, res, next){
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }, function(err, user, info){
    console.log(err, user, info);
    if(err) {
      return res.render('login', {title: '登录', errorMessage: err.message});
    }
    if(!user) {
      return res.render('login', {title: '登陆', errorMessage: info.message});
    }
    return req.logIn(user, function(err){
      if(err) {
        return res.render('login', {title: '登陆', errorMessage: err.message});
      } else {
        return res.redirect('/user');
      }
    });
  })(req, res, next);
});

//登出
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/register', function(req, res) {
  res.render('register', {title: '注册'});
});

router.post('/register', function(req, res) {
  var user = req.body;
  var userEmailPromise = new model.User({userEmail: user.userEmail}).fetch();
  var now = new Date();

  return userEmailPromise.then(function(model_fetch) {
    if(model_fetch) {
      res.render('login', {title: '登录', errorMessage: '该邮箱已被注册！'});
    } else {
      var password = user.userPassword;
      var hash = bcrypt.hashSync(password);
      var name = user.userName;

      var registerUser = new model.User({
        userEmail: user.userEmail,
        userPassword: hash,
        userName: name,
        userCreateTime: now
      });
      registerUser.save().then(function(model_fetch){
        mail.send(user.userEmail, '欢迎使用', '你将拥有高效率的生活方式', '<b>你将拥有高效率的生活方式</b>');
        res.render('login', {title: '登录', message: '注册成功'});
      });
    }
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
