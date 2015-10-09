var express = require('express');
var passport = require('passport');
var router = express.Router();
var Farmer = require('../models/farmer');


var allProducts = {
  meats : [
    { label: 'Beef', name: 'beef' },
    { label: 'Chicken', name: 'chicken' },
    { label: 'Duck', name: 'duck' },
    { label: 'Lamb', name: 'lamb' },
    { label: 'Pork', name: 'pork' },
    { label: 'Rabbit', name: 'rabbit' },
    { label: 'Venison', name: 'venison' }
  ],
  produce : [
    { label: 'Bananas', name: 'bananas' },
    { label: 'Carrots', name: 'carrots' },
    { label: 'Eggplant', name: 'eggplant' },
    { label: 'Figs', name: 'figs' },
    { label: 'Garlic', name: 'garlic' },
    { label: 'Lettuce', name: 'lettuce' },
    { label: 'Peppers', name: 'peppers' },
    { label: 'Pumpkin', name: 'pumpkin' },
    { label: 'Potatoes', name: 'potatoes' },
    { label: 'Spinach', name: 'spinach' },
    { label: 'Squash', name: 'squash' },
    { label: 'Tomatoes', name: 'tomatoes' },
    { label: 'Watermelon', name: 'watermelon' }
  ],
  otherProducts : [
    { name: 'eggs', label: 'Eggs' },
    { name: 'bread', label: 'Bread' },
    { name: 'milk', label: 'Milk' }
  ]
};


/* GET home page. */
router.get('/', function(req, res, next) {
  Farmer.find({}, function(err, farmers) {
    if (err) return console.log(err);
    else{
      res.render('index', { title: 'FARM CONNECT',
                          farmer: currentFarmer,
                          farmers: farmers, allProducts: allProducts
      });
    }
  });
});

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
    res.redirect('farmers/' + req.user._id + '/edit/');
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

// Search
router.get('/search', function(req, res, next) {
  var results = [];
  var products = req.body.products;
  console.log(products);
  if (products) {
    // TODO:
    // 1. create a single array of containing all of the products that were selected
    // 2. use mongoose $in method to find all farmers that have any of the selected produce
    // 3. call render inside callback of $in operation
    Farmer.find({ 'products': { $in: products } }, function(err, farmers) {
      res.render('/search', {farmers: farmers});
    });


    forEach(function(produce, produce) {
      Farmer.find({ 'details.products.produce[produce]': true }, function(err, farmers) {
        results.push(farmers);
        console.log('Search results: ' + results);
      });
    });

  }

});


module.exports = router;
