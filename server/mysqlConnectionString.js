

var mysqlConnectionString = {
    
    connection  :{
        
        dev : {
            host: 'localhost',
            user: 'root',
            password : 'root@321',
            database : 'jobcrawler'
        }

        ,
        
        qa : {
            host: 'yourhost',
            user: 'yourdatabaseusername',
            password : 'yourpasssword',
            database : 'yourdatabasename'
        }
        ,prod : {
            host: 'yourhost',
            user: 'yourdatabaseusername',
            password : 'yourpasssword',
            database : 'yourdatabasename'
        }
    
    }

};

module.exports.mysqlConnectionString = mysqlConnectionString;
