/*var express = require('express');
var router = express.Router();*/
var fs = require('fs');

module.exports = function(app){
  var FS_PATH = './routes/services/';
  var RE_PATH = './services/';

  fs.readdir(FS_PATH, function(err, list){
    if(err){
      console.log('没有找到该文件');
    }

    for(var e; list.length && (e = list.shift());){
      var services = require(RE_PATH + e);
      services.init && services.init(app);
    }
  });
};
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
