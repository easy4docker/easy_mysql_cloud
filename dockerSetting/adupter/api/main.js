const { createPublicKey } = require("crypto");
const { fstat } = require("fs");

(function() {
    var obj = function(env) {
        var me = this,
            crowdProcess = require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
            CP = new crowdProcess(),
            fs = require('fs'),
            MYSQL = require(__dirname + '/vendor/mysql/node_modules/mysql');
        
        me.call = (postData, callback) => {
            switch(postData.cmd) {
                case 'getAppUsers':
                    me.getAppUsers(callback)
                    break;
                default:
                    callback({status: 'failure', message: "Plugin API is missing cmd!"})
            }
        }
        me.readJson = (path, cb) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    cb({})
                } else {
                    var jdata = {};
                    try {
                        jdata = JSON.parse(data);
                    } catch (e) {}
                    cb(jdata);
                }
            })
        }
        me.getAppUsers = (callback) => {
            me.readJson(env.root + '/env/key.json', (data) => {
                /*const password = data.key; 
                const cfg = {
                    host: 'localhost',
                    port : '3306',
                    user: 'root',
                    password: password,
                    multipleStatements: true
                };*/
                callback(data);
            });
            
            return true;
            try {
                var cfg = {
                    host: inData.dockerEnv.main_ip,
                    port : parseInt(inData.dockerEnv.siteConfig.unidx * 10000) + parseInt(inData.dockerEnv.siteConfig.docker.ports[0]),
                    user: 'root',
                    password: 'inData.dockerEnv.rootKey.key',
                    multipleStatements: true
                };
                callback(__dirname);
                return false;
                /*
                createPublicKey(cfg); return true;
                var connection = MYSQL.createConnection(cfg);
                var sql_str = 'USE `mysql`; SELECT `Host`, `User` FROM `user` WHERE `User` like "appUser%";'
                connection.query(sql_str, function (error, results, fields) {
                    connection.end();
                    callback((error) ? error : results[1]);
                });*/
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
