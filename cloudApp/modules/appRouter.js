(function () { //
	var obj =  function (env, pkg, req, res) {
		var me = this;
		var fs = require('fs');
		var path = require('path');
		let AUTH = pkg.require(__dirname + '/auth.js');
		let auth= new AUTH(env, pkg, req, res);
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
			switch(req.body.cmd) {
				case 'postPageAuth':
					auth.page();
					break;
				case 'api':
					auth.api((sts) => {
						if (sts) {
							res.send({status : 'success', data:req.body});
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
