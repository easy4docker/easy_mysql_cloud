(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		me.call = function(cbk) {
			pkg.readJson(env.appEnv + '/token.json', (tokenRec) => {
				if (tokenRec && tokenRec.initToken === req.body.token && req.body.token) {
					cbk();
				} else {
					res.send({status:'failure', message: 'Failure authentication!'});
				}
			});
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
