
var connectionProvider = require('../mysqlConnectionStringProvider');

var ExpenseDao = {
    getAll : function (callback){
        let result = [ 
            { id: 1, name : 'Akilon', date : '2016-10-10', branch_code : '1A', bank_code : '123', bank_acc : '54321', bank_accholder : 'Akilon Krishnan', total : '00.00' },
            { id: 2, name : 'Cynthia', date : '2016-10-10', branch_code : '1B', bank_code : '456', bank_acc : '895565', bank_accholder : 'Cynthia Lee', total : '00.00' }
        ];
        callback(result);
    },
    create : function (progress, OnSuccessfulCallback){
        var category = {
            project_id : progress.project_id,
            total_manpower : progress.total_manpower,
            total_paint : progress.total_paint,
            total_metresquare : progress.total_metresquare,
            remarks : progress.remarks
        };
        var insertStatement = "INSERT INTO progress SET ?, created_on = NOW()";
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        if(connection) {
            connection.query(insertStatement, category, function(err, result){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    getItemById: function(id, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM progress WHERE id = ?";
        if (connection){
            connection.query(queryStatement, [id], function(err, result, fields){
               if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    update : function(total_manpower, total_paint, total_metresquare, remarks, id, OnSuccessfulCallback){
        console.log(total_manpower, total_paint, total_metresquare, remarks, id);
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE progress SET total_manpower = ?, total_paint = ?, total_metresquare = ?, remarks = ? WHERE id = ?";
        if (connection) {
            connection.query(queryStatement, [total_manpower, total_paint, total_metresquare, remarks, id], function (err, result, fields){
               if (err) throw err;
               console.log("done updates");
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    remove : function(progressId, OnSuccessfulCallback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DELETE FROM progress WHERE id = ?";
        if (connection) {
            connection.query(queryStatement, [progressId], function (err, result, fields){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    scanned : function (worker, OnSuccessfulCallback){
        var attendance = {
            worker_id : worker.id
        };
        var worker = {};
        var stmt = "SELECT * FROM progress WHERE id = ?";
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        if (connection){
            connection.query(stmt, [worker.id], function(err, result, fields){
               if (err) throw err;
                worker = result;
            });
        }
        var stmt = "INSERT INTO attendance SET ?, created_on = NOW()";
        if(connection) {
            connection.query(stmt, attendance, function(err, result){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    }
};

module.exports.ExpenseDao = ExpenseDao;