const { createPublicKey } = require('crypto');

(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this,
			MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');

		me.call = (postData, callback) => {
			if (!postData.code || typeof this[postData.code] !== 'function') {
				callback(postData.code)
			 } else {
				me[postData.code](callback);
				
			}
			
			/*
			pkg.readJson(env.appEnv + '/key.json', (keyRec) => {
				const cfg = {
					host: 'localhost',
					port : '3306',
					user: 'root',
					password: keyRec.key,
					multipleStatements: true
				};
				const connection = MYSQL.createConnection(cfg);
				connection.query(sql, (error, results, fields) => {
					connection.end();
					callback((error) ? { status : 'failure', message : error.message} : 
						{ status : 'success', result : results});
				});
				
			});*/
		};
		me.getTokens = (cbk) => {
			cbk(['test1', 'test2'])
		}
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
