(function () { 
	var obj =  function (env, pkg, req, res) {
        var fs = require('fs'),
            me = this;
		me.call = function(cbk) {
			res.send({status:'success', step: 'nonAuthPage'});
			return true;
			let spaDir = env.appFolder + '/www/js/package/';
			let cfgFn = spaDir + p.replace(dirPatt, '');

			let fileAttr = me.getConfigAttr(cfgFn);

			pkg.readJson(fileAttr.fileName, (cfg) => {
				me.sendHeader(fileAttr.type);
				if (fileAttr.type.indexOf(['vue']) !== -1) {
					me.packVueFile(cfg);
				} else if (fileAttr.type.indexOf(['js']) !== -1) {
					me.packJsFile(cfg);
				} else if (fileAttr.type.indexOf(['css']) !== -1) {
					me.packCssFile(cfg);
				} else {
					me.packJsFile(cfg);
				}
            });
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
