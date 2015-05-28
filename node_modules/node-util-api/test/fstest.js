/**
 * Created by Administrator on 2015-05-28.
 */

var assert = require('assert');
var fs = require('fs');
var fsutil = require('../index');

exports.fsutil = {
    'list' : {
        'test1' : function() {
            var files = fsutil.getFiles('./test');
            console.log(files);
        },
        'test2' : function() {
            var files = fsutil.getFiles('./lib');
            console.log(files);
        }
    },
    'mkdir' : {
        'test one directory' : function() {
            var path = './test2';
            fsutil.mkdir(path);
            assert(fs.existsSync(path));
            fs.rmdir(path);
        },
        'test sub directory' : function() {
            var path = './test2/test';
            fsutil.mkdir(path);
            assert(fs.existsSync(path));
            fs.rmdir('./test2/test');
            fs.rmdir('./test2');
        }
    },
    'createfile' : {
        'create text' : function() {
            var filename = './test2/hello1.txt';
            var file = fsutil.createFile(filename);
            file.end('file end');
        },
        'create text and println' : function() {
            var filename = './test2/hello2.txt';
            var file = fsutil.createFile(filename);
            file.println('hello');
            file.println('world');
            file.end();
        },
        'create text and print' : function() {
            var filename = './test2/hello3.txt';
            var file = fsutil.createFile(filename);
            file.print('hello');
            file.print(' world');
            file.end();
        },
        'create text and end with str' : function() {
            var filename = './test2/hello4.txt';
            var file = fsutil.createFile(filename);
            file.end('hello world!!');
        }

    }
};