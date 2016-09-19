
var connectionProvider = require('../mysqlConnectionStringProvider');

var JobDao = {
    jobs : function (callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var query = "SELECT * FROM job ORDER BY id DESC";
        if (connection){
            connection.query(query, function(err, result, fields){
                if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    projects : function (callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var query = "SELECT * FROM project ORDER BY project_name ASC";
        if (connection){
            connection.query(query, function(err, result, fields){
                if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
};

module.exports.JobDao = JobDao;