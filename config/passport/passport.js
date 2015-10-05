var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
var Farmer = require('../../models/farmer');

var passportConfig = function(passport) {

  // Strategies
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login' , localLoginStrategy);

  // Session Support
  passport.serializeUser(function(farmer, callback) {
    callback(null, farmer.id);
  });

  passport.deserializeUser(function(id, callback) {
    Farmer.findById(id, function(err, farmer) {
      callback(err, farmer);
    });
  });
};

module.exports = passportConfig;
