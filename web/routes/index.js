var express = require('express');
var router = express.Router();
var request = require('sync-request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var httpReq = request('GET', 'http://localhost:9999/data/get');
  res.render('index', { title: 'Express' , data : httpReq.getBody('utf-8') });
});

module.exports = router;
