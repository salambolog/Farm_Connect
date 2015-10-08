var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/about', function(req, res, next) {
  res.render('about');
});



module.exports = router;
