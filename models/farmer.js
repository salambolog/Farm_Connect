var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var FarmerSchema = new Schema({
  name: String,
  local :{ email: String,
           password: String
         },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: Number
  },
  farm_name: String,
  details: {
    products: [],
    organic: Boolean
  }
});

FarmerSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

FarmerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Farmer', FarmerSchema);
