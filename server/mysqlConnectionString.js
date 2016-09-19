

var mysqlConnectionString = {
    
    connection  :{
        dev : {
            host: 'localhost',
            user: 'root',
            password : 'xxx',
            database : 'xxx'
        },
        qa : {
            host: 'yourhost',
            user: 'yourdatabaseusername',
            password : 'yourpasssword',
            database : 'yourdatabasename'
        },
        prod : {
            host: 'yourhost',
            user: 'yourdatabaseusername',
            password : 'yourpasssword',
            database : 'yourdatabasename'
        }
    }
};

module.exports.mysqlConnectionString = mysqlConnectionString;
