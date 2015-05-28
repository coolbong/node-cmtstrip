/**
 * Created by coolbong on 2014-11-24.
 */


require('./predefined');
var fsutil = require('./fs');


function toBinary(/*number*/d) {
    return ("0000000" + (Number(d).toString(2))).slice(-8).toUpperCase();
}

function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

module.exports = {
    toBinary: toBinary,
    prettyJSON: prettyJSON,
    mkdir : fsutil.mkdir,
    getFiles : fsutil.getFiles,
    createFile : fsutil.createFile,
    readFile : fsutil.readFile
};

