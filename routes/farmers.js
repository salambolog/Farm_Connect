var express = require('express');
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

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', function(req, res, next) {
  console.log('FARMERS:index');
  res.render('index', { title: 'FARM CONNECT',
                        farmer: currentFarmer
   });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var farmer = {
    name: String,
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: Number
      },
    farm_name: String,
    products: [String],
    organic: false
    };
  res.render('farmers/new', { farmer: farmer, checked: '', message: req.flash() });
});

// SHOW
router.get('/:id', function(req, res, next) {
  Farmer.findById(req.params.id, function(err, farmer) {
    res.render('farmers/show', { farmer: farmer, allProducts: allProducts, message: req.flash() } );
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var farmer = currentFarmer;
  console.log('farmer: ' + farmer);
  if (!farmer) return next(makeError(res, 'Document not found', 404));
  console.log('My products: ' + farmer.products);
  res.render('farmers/edit', { farmer: farmer, allProducts: allProducts, message: req.flash() } );
});


// UPDATE
router.put('/:id', function(req, res, next) {
  if (!currentFarmer) return next(makeError(res, 'Document not found', 404));
  console.log('Farmer params: ' + JSON.stringify(req.body));
  Farmer.findById(req.params.id, function(err, farmer) {
    if (err) return next(err);
     else {
      farmer.name = req.body.name;
      farmer.local.email = req.body.email;
      farmer.phone = req.body.phone;
      farmer.address.street = req.body.street;
      farmer.address.city = req.body.city;
      farmer.address.state = req.body.state;
      farmer.address.zipcode = req.body.zipcode;
      farmer.farm_name = req.body.farm_name;
      farmer.products = [];
        req.body.products.forEach(function(p) {
           farmer.products.push(p);
         console.log('products ' + farmer.products);
        });


          // farmer.products = req.body.apples ? true : false;
          // farmer.details.products.produce.bananas = req.body.bananas ? true : false;
          // farmer.details.products.produce.carrolts = req.body.carrolts ? true : false;
          // farmer.details.products.produce.eggplants = req.body.eggplants ? true : false;
          // farmer.details.products.produce.figs = req.body.figs ? true : false;
          // farmer.details.products.produce.garlic = req.body.garlic ? true : false;
          // farmer.details.products.produce.lettuce = req.body.lettuce ? true : false;
          // farmer.details.products.produce.peppers = req.body.peppers ? true : false;
          // farmer.details.products.produce.pumpkin = req.body.pumpkin ? true : false;
          // farmer.details.products.produce.potatoes = req.body.potatoes ? true : false;
          // farmer.details.products.produce.spinach = req.body.spinach ? true : false;
          // farmer.details.products.produce.tomatoes = req.body.tomatoes ? true : false;
          // farmer.details.products.produce.watermelon = req.body.watermelon ? true : false;
          // farmer.details.products.meat.beef = req.body.beef ? true : false;
          // farmer.details.products.meat.chicken = req.body.chicken ? true : false;
          // farmer.details.products.meat.duck = req.body.duck ? true : false;
          // farmer.details.products.meat.lamb = req.body.lamb ? true : false;
          // farmer.details.products.meat.pork = req.body.pork ? true : false;
          // farmer.details.products.meat.rabbit = req.body.rabbit ? true : false;
          // farmer.details.products.meat.venison = req.body.venison ? true : false;
          // farmer.details.products.other.eggs = req.body.eggs ? true : false;
          // farmer.details.products.other.bread = req.body.bread ? true : false;
          // farmer.details.products.other.milk = req.body.milk ? true : false;
      farmer.save(function(err) {
        if (err) return next(err);
        // Redirect to profile after update
        res.redirect('/farmers/' + farmer._id);
      });
  }
  });

});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  if (!currentFarmer) return next(makeError(res, 'Document not found', 404));
    Farmer.findByIdAndRemove(currentFarmer, function(err, res) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
