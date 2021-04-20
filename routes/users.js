var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/teste', function(req, res, next) {
  console.log('to aqui');
});

module.exports = router;
