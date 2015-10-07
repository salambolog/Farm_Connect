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
    products: {
      meat:{
        beef: Boolean,
        chicken: Boolean,
        duck: Boolean,
        lamb: Boolean,
        pork: Boolean,
        rabbit: Boolean,
        venison: Boolean
      },
      produce:{
        apples: Boolean,
        bananas: Boolean,
        carrots: Boolean,
        eggplant: Boolean,
        figs: Boolean,
        garlic: Boolean,
        lettuce: Boolean,
        peppers: Boolean,
        pumpkin: Boolean,
        potatoes: Boolean,
        spinach: Boolean,
        squash: Boolean,
        tomatoes: Boolean,
        watermelon: Boolean
      },
      other: {
        eggs: Boolean,
        bread: Boolean,
        milk: Boolean
      }
    },
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
