var express   = require('express');
var router    = express.Router();

router.get('/data/get/', function(req, res, next) {
console.log('ss');
  var data = {
    name      : 'Ricardo Alcocer',
    avatar    : 'https://avatars3.githubusercontent.com/u/1271259?v=3&s=460',
    job_title : 'Dev Rel Guy'
  }

  res.send(data);

});

module.exports = router;
