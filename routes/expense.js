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

router.get('/scan', function(req, res, next) {
    res.render('progress/scan', { title: 'Scan Progress'});
});

router.post('/scanned', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.scanned(req.body,
        function (status) {
            res.json(status);
            console.log(status);
        });
});

router.get('/create/:jobId/:projectId', function(req, res, next) {
    res.render('progress/create', { title: 'Create New Progress', job_id: req.params.jobId });
});

router.post('/create', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.create(req.body,
        function (status) {
            res.json(status);
            console.log(status);
        });
});

router.get('/main/:jobId/:projectId', function(req, res, next) {
    res.render('progress/main', { title: 'Progress', job_id: req.params.jobId });
});

router.get('/getAll/:projectId', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.getAll(req.params.projectId,
        function (progress) {
            res.json({"progress" : progress});
        });
});

router.get('/edit/:jobId/:progressId', function(req, res, next) {
    res.render('progress/edit', { title: 'Edit Project' , job_id: req.params.jobId });
});

router.get('/get/:progressId', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.getItemById( req.params.progressId,
        function (progress) {
            res.json({"progress" : progress});
            console.log(progress);
        });
});

router.put('/:id', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.update(
        req.body.total_manpower,
        req.body.total_paint,
        req.body.total_metresquare,
        req.body.remarks,
        req.params.id,
        function (status) {
            res.json(status);
        });
});

router.delete('/:progressId', function(req, res, next) {
    var dao = require('../server/dao/ProgressDao.js');
    dao.ProgressDao.remove( req.params.progressId,
        function (status) {
            res.json(status);
            console.log(status);
        });
});

module.exports = router;
