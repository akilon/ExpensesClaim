
var connectionProvider = require('../mysqlConnectionStringProvider');

var EstimationDao = {
    create : function (estimation, OnSuccessfulCallback){
        var item = {
            project_id : estimation.project_id,
            coatNo : estimation.coatNo,
            coatName : estimation.coatName,
            vs : estimation.vs,
            dft : estimation.dft,
            theoCoverage : estimation.theoCoverage,
            wastageP : estimation.wastageP,
            wastageMS : estimation.wastageMS,
            areaMS : estimation.areaMS,
            paintMS : estimation.paintMS,
            paintLTR : estimation.paintLTR,
            paintTotal : estimation.paintTotal,
            thinnerMS : estimation.thinnerMS,
            thinnerLTR : estimation.thinnerLTR,
            thinnerTotal : estimation.thinnerTotal,
            totalCostMS : estimation.totalCostMS,
            totalCost : estimation.totalCost
        };
        var insertStatement = "INSERT INTO estimation SET ?";
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        if(connection) {
            connection.query(insertStatement, item, function(err, result){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    createGroup : function (estimationGroup, OnSuccessfulCallback){
        var item = {
            project_id : estimationGroup.project_id,
            paint_system : estimationGroup.paint_system,
            surface_prep : estimationGroup.surface_prep,
            application : estimationGroup.application,
            autoblast : estimationGroup.autoblast
        };
        var insertStatement = "INSERT INTO estimation_group SET ?";
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        if(connection) {
            connection.query(insertStatement, category, function(err, result){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    getAll : function (projectId, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM estimation WHERE project_id = ?";
        if (connection){
            connection.query(queryStatement, [projectId], function(err, result, fields){
                if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    getAllGroup : function (id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM estimation_group WHERE project_id = ?";

        if (connection){
            connection.query(queryStatement, [id], function(err, result, fields){
                if (err) throw err;
                console.log(result);
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    getItemById: function(id, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM estimation WHERE id = ?";
        if (connection){
            connection.query(queryStatement, [id], function(err, result, fields){
               if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    getItemGroupById: function(id, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM estimation_group WHERE id = ?";

        if (connection){
            connection.query(queryStatement, [id], function(err, result, fields){
               if (err) throw err;
                callback(result);
            });
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    },
    update : function(estimation, OnSuccessfulCallback){


        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE estimation SET coatNo = ?, coatName = ?, vs = ?, dft = ?, theoCoverage = ?, wastageP = ?, wastageMS = ?, areaMS = ?, paintMS = ?, paintLTR = ?, paintTotal = ?, thinnerMS = ?, thinnerLTR = ?, thinnerTotal = ?, totalCostMS = ?, totalCost = ? WHERE id = ?";

        if (connection) {
            connection.query(queryStatement, [
                estimation.coatNo, 
                estimation.coatName, 
                estimation.vs, 
                estimation.dft, 
                estimation.theoCoverage, 
                estimation.wastageP, 
                estimation.wastageMS, 
                estimation.areaMS, 
                estimation.paintMS, 
                estimation.paintLTR, 
                estimation.paintTotal, 
                estimation.thinnerMS, 
                estimation.thinnerLTR, 
                estimation.thinnerTotal, 
                estimation.totalCostMS, 
                estimation.totalCost, 
                estimation.id], function (err, result, fields){
               if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    },
    updateGroup : function(estimationGroup, OnSuccessfulCallback){

        var item = {
            id : estimationGroup.id,
            paint_system : estimationGroup.paint_system,
            surface_prep : estimationGroup.surface_prep,
            application : estimationGroup.application,
            autoblast : estimationGroup.autoblast
        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE estimation_group SET paint_system = ?, surface_prep = ?, application = ?, autoblast = ? WHERE id = ?";

        if (connection) {
            connection.query(queryStatement, [
                item.paint_system, 
                item.surface_prep, 
                item.application, 
                item.autoblast, 
                item.id
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
    },
    removeGroup : function(id, OnSuccessfulCallback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DELETE FROM estimation_group WHERE id = ?";

        if (connection) {
            connection.query(queryStatement, [id], function (err, result, fields){
                if (err) throw err;
                OnSuccessfulCallback({ status : 'successful'});
            });
        }
    }
};

module.exports.EstimationDao = EstimationDao;