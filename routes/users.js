var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');

var csurfProtection = csurf();
router.use(csurfProtection); //Protecc session

router.get('/profile', isLogin, function (require, response, next) {
  response.render('user/profile');
});

router.get('/logout', isLogin, function (require, response, next) {
  require.logout();
  response.render('/');
});


router.get('/signup', function (require, response, next) {
  var msg = require.flash('err');
  response.render('user/signup', { csurfToken: require.csrfToken(), msg: msg, hasErrors: msg.lennght > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});

router.get('/', isntLogin, function (require, response, next) {
  next();
});

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
  } else {
      res.redirect('/user/profile');
  }
});




module.exports = router;


function isLogin(require, response, next) {
  if (require.isAuthenticated()) {
    return next();
  }
  response.redirect('/');
}

function isntLogin(require, response, next) {
  if (!require.isAuthenticated()) {
    return next();
  }
  response.redirect('/');
}