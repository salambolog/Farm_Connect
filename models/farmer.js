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
        beef: {type: Boolean, default: false},
        chicken: {type: Boolean, default: false},
        duck: {type: Boolean, default: false},
        lamb: {type: Boolean, default: false},
        pork: {type: Boolean, default: false},
        rabbit: {type: Boolean, default: false},
        venison: {type: Boolean, default: false}
      },
      produce:{
        apples: {type: Boolean, default: false},
        bananas: {type: Boolean, default: false},
        carrots: {type: Boolean, default: false},
        eggplant: {type: Boolean, default: false},
        figs: {type: Boolean, default: false},
        garlic: {type: Boolean, default: false},
        lettuce: {type: Boolean, default: false},
        peppers: {type: Boolean, default: false},
        pumpkin: {type: Boolean, default: false},
        potatoes: {type: Boolean, default: false},
        spinach: {type: Boolean, default: false},
        squash: {type: Boolean, default: false},
        tomatoes: {type: Boolean, default: false},
        watermelon: {type: Boolean, default: false}
      },
      other: {
        eggs: {type: Boolean, default: false},
        bread: {type: Boolean, default: false},
        milk: {type: Boolean, default: false},
      }
    },
    organic: {type: Boolean, default: false}
  }
});


FarmerSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

FarmerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Farmer', FarmerSchema);
