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

			// ---- router related code
			if (mp && mp[1] === 'app') {
				auth.page();
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
					auth.api((sts) => {
						if (sts) {
							const SQL = pkg.require(__dirname + '/sql.js');
							const sql = new SQL(env, pkg);
							sql.query(req.body.sql, (result) => {
									res.send(result);
							}); 
						} else {
							res.send({status: 'failure', message: 'Authentication failed!'});
						}
					});
					break;
				case 'token':
					let TOKENS = pkg.require(__dirname + '/tokens.js');
					let tokens = new TOKENS(env, pkg);
					auth.api((sts) => {
						if (sts) {
							tokens.call(req.body,(result)=> {
								res.send({status: 'success', result :result});
							});
							
						} else {
							tokens.call(req.body,()=> {
								res.send({status: 'failure', message: 'Authentication failed!'});;
							});
						}
					});
					break;
				default :
					res.send({status: 'failure', message: 'wrong CMD code!'});
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
