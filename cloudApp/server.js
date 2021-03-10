const express = require('express');
const multer  = require('multer')

const bodyParser = require('body-parser');
const upload = multer({ dest: '/tmp/uploaded' });
const app = express();

var path = require('path');
var fs = require('fs');

const port = 80;
var env = {
    root : __dirname,
    dataFolder : '/var/_localAppData',
    appFolder : '/var/_localApp/cloudApp'
}
var pkg = {
    readJson : (path, cb) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                cb({})
            } else {
                var jdata = {};
                try {
                    jdata = JSON.parse(data);
                } catch (e) {}
                cb(jdata);
            }
        })
    },
    require : (fileName, isCache) => {
        if (!isCache) {
            delete require.cache[fileName];
        }
        return require(fileName);
    },
    crowdProcess : require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
}


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
  extended: true
})); 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var RESTS = 'get|put|post|delete'.split('|');

for (var i=0 ; i < RESTS.length; i++) {
    (function(i) {
        app[RESTS[i]](/(.+)$/i, (req, res) => {
           const MROUTER = pkg.require(__dirname + '/modules/appRouter.js');
           const mroute = new MROUTER(env, pkg, req, res);
            try {
                mroute.route(RESTS[i]);
            } catch (err) {
                res.send(err.message);
            }
        });
    })(i)
}

app.listen(port,  () => {
    var d = new Date(); // for now
    datetext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    console.log(datetext + ' Start Easy mysql clopud listening at http://localhost');
});
