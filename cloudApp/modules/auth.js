(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		me.call = function(cbk) {
			pkg.readJson(env.appEnv + '/token.json', (tokenRec) => {
				if (tokenRec && tokenRec.initToken === req.body.token && req.body.token) {
					me.sendAuthPage();
				} else {
					me.sendUnAuthPage();
				}
			});
		};
		me.sendAuthPage = () => {
			res.render(env.root  + '/views/index.ect', req.body);
		};
		me.sendUnAuthPage = () => {
			res.render(env.root  + '/views/unAuth.ect', req.body);
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
