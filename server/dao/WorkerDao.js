
var connectionProvider = require('../mysqlConnectionStringProvider');

var WorkerDao = {
    create : function (worker, OnSuccessfulCallback){
        var item = {
            job_id : worker.job_id,
            firstname : worker.firstname,
            lastname : worker.lastname,
            barcode : worker.barcode,
            nationality : worker.nationality,
            work_permit : worker.work_permit,
            account_no : worker.account_no
        };
        var insertStatement = "INSERT INTO worker SET ?";
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        if(connection) {
            connection.query(insertStatement, item, function(err, result){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    getAll : function (jobId, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM worker WHERE job_id = ?";
        if (connection){
            connection.query(queryStatement, [jobId], function(err, result, fields){
                if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    getItemById: function(id, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM worker WHERE id = ?";
        if (connection){
            connection.query(queryStatement, [id], function(err, result, fields){
               if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    update : function(worker, id, OnSuccessfulCallback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE worker SET firstname = ?, lastname = ?, nationality = ?, work_permit = ?, account_no = ? WHERE id = ?";
        if (connection) {
            connection.query(queryStatement, [
                worker.firstname, 
                worker.lastname, 
                worker.nationality, 
                worker.work_permit,
                worker.account_no, 
                id
                ], function (err, result, fields){
               if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    remove : function(projectEstimationId, OnSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DELETE FROM estimation WHERE id = ?";

        if (connection) {
            connection.query(queryStatement, [projectEstimationId], function (err, result, fields){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    }
};

module.exports.WorkerDao = WorkerDao;