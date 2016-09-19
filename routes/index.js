var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wealthx' });
});


/* GET search list. */
router.get('/search', function(req, res, next) {
    var dao = require('../server/dao/SearchDao.js');
    dao.SearchDao.list(function (data){
      res.json({"search" : data});
    });
});

module.exports = router;
