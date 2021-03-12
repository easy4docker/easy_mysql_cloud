(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		me.page = function(cbk) {
			pkg.readJson(env.appEnv + '/token.json', (tokenRec) => {
				if (tokenRec && tokenRec.initToken === req.body.token && req.body.token) {
					res.render(env.root  + '/views/index.ect', req.body)
				} else {
					res.render(env.root  + '/views/unAuth.ect', req.body);
				}
			});
		};
		me.api = (cbk) => {
			pkg.readJson(env.appEnv + '/token.json', (tokenRec) => {
				if (tokenRec && tokenRec.initToken === req.body.token && req.body.token) {
					cbk(true);
				} else {
					cbk(false);
				}
			});
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
