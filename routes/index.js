var express = require('express');
var passport = require('passport');
var router = express.Router();
var Farmer = require('../models/farmer');


/* GET home page. */
router.get('/', function(req, res, next) {
  Farmer.find({}, function(err, farmers) {
  if (err) return console.log(err);
  else{
  res.render('index', { title: 'Farm Connect',
                        farmer: currentFarmer,
                        farmers : farmers
    });
    }
  });
});


// GET Farmers
// router.get('/farmers', function(req, res, next){
//   var addresses = Address.find({};)
// });

router.get('/farmers', function(req, res, next){
  Farmer.find({}, function(err, farmers){
    if(err) return next(err);
    res.send(farmers);
  });
});

// // POST FARMERS
// router.post('/farmers', function(req, res, next){

// });

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

function signupAuthenticate(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
}

// POST /signup
router.post('/signup', signupAuthenticate, function(req, res, next) {
  if (req.user) {
    res.redirect('/farmers/' + req.user._id);
  }
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

function authenticate(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    failureRedirect : '/login',
    failureFlash : true
  });
  return loginProperty(req, res, next);
}

// POST /login
router.post('/login', authenticate, function(req, res, next) {
  if (req.user) {
    res.redirect('/farmers/' + req.user._id);
  }
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
