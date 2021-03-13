(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this,
			MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');
		
		me.query = (sql, callback) => {
			pkg.readJson(env.appEnv + '/key.json', (keyRec) => {
				const cfg = {
					host: 'localhost',
					port : '3306',
					user: 'root',
					password: keyRec.key,
					multipleStatements: true
				};
		
				var connection = MYSQL.createConnection(cfg);
				connection.query(sql, (error, results, fields) => {
					connection.end();
					callback((error) ? { status : 'failure', message : error.message} : 
						{ status : 'success', result : results});
				});
				
			});
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
