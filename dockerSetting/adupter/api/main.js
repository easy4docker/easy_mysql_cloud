(function() {
    var obj = function() {
        var me = this,
            crowdProcess = require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
            CP = new crowdProcess(),
            MYSQL = require(__dirname + '/vendor/mysql/node_modules/mysql');
        
        this.call = (inData, callback) => {
            var opt = (!inData || !inData.requestData || !inData.requestData.cmd) ? 'err' : inData.requestData.cmd;
            try {
                me[opt](inData, callback);
            } catch(e) {
                callback(__dirname + ':' + e.message + '--' + opt);
            }  
        }
        this.getAppUsers = (inData, callback) => {
            try {
                var cfg = {
                    host: inData.dockerEnv.main_ip,
                    port : parseInt(inData.dockerEnv.siteConfig.unidx * 10000) + parseInt(inData.dockerEnv.siteConfig.docker.ports[0]),
                    user: 'root',
                    password: inData.dockerEnv.rootKey.key,
                    multipleStatements: true
                };
                var connection = MYSQL.createConnection(cfg);
                var sql_str = 'USE `mysql`; SELECT `Host`, `User` FROM `user` WHERE `User` like "appUser%";'
                connection.query(sql_str, function (error, results, fields) {
                    connection.end();
                    callback((error) ? error : results[1]);
                });
            } catch(e) {
                callback(__dirname + ':' + e.message);
            }
        } 
        this.addUser = (inData, callback) => {
            try {
                var cfg = {
                    host: inData.dockerEnv.main_ip,
                    port : parseInt(inData.dockerEnv.siteConfig.unidx * 10000) + parseInt(inData.dockerEnv.siteConfig.docker.ports[0]),
                    user: 'root',
                    password: inData.dockerEnv.rootKey.key,
                    multipleStatements: true
                };
                var requestData = inData.requestData;
                var connection = MYSQL.createConnection(cfg);
                var sql_str = 'CREATE USER IF NOT EXISTS "appUser"@"%" IDENTIFIED BY "' + requestData.postData.password.replace(/\"/ig, '\"') + '";';
                sql_str += 'GRANT ALL PRIVILEGES ON * . * TO "appUser"@"%"; FLUSH PRIVILEGES;';
                connection.query(sql_str, function (error, results, fields) {
                    connection.end();
                    callback((error) ? error : results);
                });
            } catch(e) {
                callback(__dirname + ':' + e.message);
            }
        } 

        this.removeAppUser = (inData, callback) => {
            try {
                var cfg = {
                    host: inData.dockerEnv.main_ip,
                    port : parseInt(inData.dockerEnv.siteConfig.unidx * 10000) + parseInt(inData.dockerEnv.siteConfig.docker.ports[0]),
                    user: 'root',
                    password: inData.dockerEnv.rootKey.key,
                    multipleStatements: true
                };
                var connection = MYSQL.createConnection(cfg);
                var sql_str = 'DROP USER "appUser"@"%"; FLUSH PRIVILEGES;';
                connection.query(sql_str, function (error, results, fields) {
                    connection.end();
                    callback((error) ? error : results);
                });
            } catch(e) {
                callback(__dirname + ':' + e.message);
            }
        }
    }
    module.exports = obj;
})()
