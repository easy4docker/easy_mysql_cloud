(function () { //
	var obj =  function (env, pkg, req, res) {
		var me = this;
		var fs = require('fs');
		var path = require('path');

		me.route = (rest) => {
			if (rest === 'get') {
				me.get();
			} else {
				me.post();
			}
		}
		me.get = () => {
			let p = req.params[0],
			mp = p.match(/\/([^\/]+)(\/|$)/);

			let AUTH = pkg.require(__dirname + '/auth.js');
			let auth= new AUTH(env, pkg, req, res);

			if (mp && mp[1] === 'spa-package') {
				let SPA = pkg.require(__dirname + '/appSpaPackage.js');
				let spa= new SPA(env, pkg, req, res);
				// res.send(p);
				spa.call(p);
				return true
			}
			if (mp && mp[1] === 'env') {
				res.send(env);
				// spa.call(p);
				return true
			}

			if (p == '/' || p == '/index.html') {
				auth.page();
			} else {
				var fn = env.root + '/www' + p;
				fs.stat(fn, function(err, stat) {
					if(err == null) {
						res.sendFile(fn);
					} else  {
						res.send({status:'failure', message:'page does not exist!'});
					}
				});
			}
		};
		me.post = () => {
			let AUTH = pkg.require(__dirname + '/auth.js');
			let auth= new AUTH(env, pkg, req, res);
			switch(req.body.cmd) {
				case 'postPageAuth':
					auth.page();
					break;
				case 'query':
					const MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');
					auth.api((sts) => {
						if (sts) {
							pkg.readJson(env.appEnv + '/key.json', (keyRec) => {
								const password = keyRec.key;
								var cfg = {
									host: 'localhost',
									port : 3306,
									user: 'root',
									password: password ,
									multipleStatements: true
								};
								var connection = MYSQL.createConnection(cfg);
								var sql_str = 'SHOW DATABASES`;';
								connection.query(sql_str, function (error, results, fields) {
									connection.end();
									res.send((error) ? error : results[1]);
								});

							});
			
							// callback(__dirname);
							// return false;
							/*
							createPublicKey(cfg); return true;
							var connection = MYSQL.createConnection(cfg);
							var sql_str = 'USE `mysql`; SELECT `Host`, `User` FROM `user` WHERE `User` like "appUser%";'
							connection.query(sql_str, function (error, results, fields) {
								connection.end();
								callback((error) ? error : results[1]);
							});*/



							// res.send({status : 'success', data: cfg});
						} else {
							res.send({env: env, data:req.body});
						}
					});
					
					break;
				default :
					res.send({env: env, data:req.body});
			}
		};

		me.sendFile = (fn) => {
			fs.stat(fn, function(err, stat) {
				if(err == null) {
					res.sendFile(fn);
				} else  {
					res.send({stauts: 'failure', message: err.message})
				}
		    });
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
