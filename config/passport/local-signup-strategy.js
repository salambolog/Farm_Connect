var LocalStrategy = require('passport-local').Strategy;
var Farmer = require('../../models/farmer');

var strategy = new LocalStrategy(
  {
    usernameField : 'email',       // default for usernameField is 'username'
    passwordField : 'password',
    passReqToCallback : true,
  },
  function(req, email, password, callback) {
    // See if a user already has this email
    Farmer.findOne({ 'local.email' : email }, function(err, farmer) {
      if (err) return callback(err);
      if (farmer) {
        // a user with this email already exists
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else {
        // Create a new user
        var newFarmer = new Farmer();
        newFarmer.name = req.body.name;
        newFarmer.farm_name = req.body.farm_name;
        newFarmer.phone = req.body.phone;
        newFarmer.address.street = req.body.street;
        newFarmer.address.city = req.body.city;
        newFarmer.address.state = req.body.state;
        newFarmer.address.zipcode = req.body.zipcode;
        newFarmer.address.organic = req.body.organic;
        newFarmer.local.email = email;
        newFarmer.local.password = newFarmer.encrypt(password);
        newFarmer.details.products.produce.apples = req.body.apples ? true : false;
        newFarmer.details.products.produce.bananas = req.body.bananas ? true : false;
        newFarmer.details.products.produce.carrots = req.body.carrots ? true : false;
        newFarmer.details.products.produce.eggplants = req.body.eggplants ? true : false;
        newFarmer.details.products.produce.figs = req.body.figs ? true : false;
        newFarmer.details.products.produce.garlic = req.body.garlic ? true : false;
        newFarmer.details.products.produce.lettuce = req.body.lettuce ? true : false;
        newFarmer.details.products.produce.peppers = req.body.peppers ? true : false;
        newFarmer.details.products.produce.pumpkin = req.body.pumpkin ? true : false;
        newFarmer.details.products.produce.potatoes = req.body.potatoes ? true : false;
        newFarmer.details.products.produce.spinach = req.body.spinach ? true : false;
        newFarmer.details.products.produce.tomatoes = req.body.tomatoes ? true : false;
        newFarmer.details.products.produce.watermelon = req.body.watermelon ? true : false;
        newFarmer.details.products.meat.beef = req.body.beef ? true : false;
        newFarmer.details.products.meat.chicken = req.body.chicken ? true : false;
        newFarmer.details.products.meat.duck = req.body.duck ? true : false;
        newFarmer.details.products.meat.lamb = req.body.lamb ? true : false;
        newFarmer.details.products.meat.pork = req.body.pork ? true : false;
        newFarmer.details.products.meat.rabbit = req.body.rabbit ? true : false;
        newFarmer.details.products.meat.venison = req.body.venison ? true : false;
        newFarmer.details.products.other.eggs = req.body.eggs ? true : false;
        newFarmer.details.products.other.bread = req.body.bread ? true : false;
        newFarmer.details.products.other.milk = req.body.milk ? true : false;
        console.log('Full request: ' + JSON.stringify(req.body));

        newFarmer.save(function(err) {
          return callback(err, newFarmer);
        });
      }
    });
  }
);

module.exports = strategy;
