var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('expense/main', { title: 'Expense Claim' });
});

router.get('/getAll', function(req, res, next) {
    var dao = require('../server/dao/ExpenseDao.js');
    dao.ExpenseDao.getAll(
        function (data) {
            res.json({"expenses" : data});
        });
});

router.get('/getGLcodes', function(req, res, next) {
    var dao = require('../server/dao/ExpenseDao.js');
    dao.ExpenseDao.getGLcodes(
        function (data) {
            res.json({"glcodes" : data});
        });
});

module.exports = router;
