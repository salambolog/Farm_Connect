var LocalStrategy = require('passport-local').Strategy;
var Farmer = require('../../models/farmer');

var strategy = new LocalStrategy(
  {
    usernameField : 'email',       // default for usernameField is 'username'
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    // Search for a user with this email
    Farmer.findOne({ 'local.email' : email }, function(err, farmer) {
      if (err) return callback(err);
      // if no farmer is found
      if (!farmer) {
        return callback(null, false, req.flash('error', 'Oops! Wrong email or password.'));
      }
      // validate correct password
      if (!farmer.validPassword(password)) {
        return callback(null, false, req.flash('error', 'Oops! Wrong email or password.'));
      }
      return callback(null, farmer);
    });
  });

module.exports = strategy;
