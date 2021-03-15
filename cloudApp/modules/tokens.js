const { createPublicKey } = require('crypto');

(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this,
			MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');

		me.call = (postData, callback) => {
			if (!postData.code || typeof this[postData.code] !== 'function') {
				callback({status: 'failure', message: 'missing method of ' + postData.code})
				} else {
				me[postData.code](postData, callback);
			}
		};
		me.makeid = (length) => {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return pkg.md5(result);
         }
		me.getTokens = (postData, cbk) => {
			pkg.readJson(env.appEnv + '/userKey.json', (keyRecs) => {
				cbk(keyRecs);
			});
		}

		me.generateToken = (postData, cbk) => {
			pkg.readJson(env.appEnv + '/userKey.json', (keyRecs) => {
				const key = me.makeid(32);
				keyRecs[key] = {owner:postData.owner, tm : new Date().getTime()};
				fs.writeFile(env.appEnv + '/userKey.json', JSON.stringify(keyRecs), ()=> {
					cbk(keyRecs);
				});
			})
		}
		me.removeToken = (postData, cbk) => {
			pkg.readJson(env.appEnv + '/userKey.json', (keyRecs) => {
				delete keyRecs[postData.key];
				fs.writeFile(env.appEnv + '/userKey.json', JSON.stringify(keyRecs), ()=> {
					cbk(keyRecs);
				});
			})
		}
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
