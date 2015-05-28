/**
 * Created by coolbong on 2015-05-28.
 */
var pkg = require('./package.json')
var ut = require('node-util-api');
var strip = require('strip-comments');
var async = require('async');
var program = require('commander');

program
    .version(pkg.version)
    .option('-i, --input <path>', 'input path')
    .option('-o, --output <path>', 'output path', './output')
    .option('-s, --strip <path>', 'strip ["block"|"line"|"all"]','all')
    .option('--verbose', 'verbose output')
    .parse(process.argv);


if(!program.input) {
    console.error('input path required!!');
    program.help();
    process.exit(1);
}

var cmd = 'cmtstrip';
if(program.input) cmd += ' --input ' + program.input;
if(program.output) cmd += ' --output ' + program.output;
if(program.strip) cmd += ' --strip ' + program.strip;


function makeWorkList(input, output, type, num, total) {
    return function(callback) {
        var stripType = strip[type] ? strip[type] : strip;
        var file_data = ut.readFile(input);
        var striped = stripType(file_data);

        var file = ut.createFile(output);

        file.print(striped);
        file.end();
        if(program.verbose) {
            console.log('done: (' + (num+1) + '/' + total + ') ' + input);
        } else {
            console.log('.');
        }
        callback();
    };
}

//print cmd line
console.log(cmd);

// get file list
var files = ut.getFiles(program.input);
var worker = [];

// make work
for(var i=0; i<files.length; i++) {
    var output = program.output+files[i].replace(program.input, '');
    //console.log(output);
    worker.push(makeWorkList(files[i], output, program.strip, i, files.length));
}

// go! go!
async.series(worker, function(err) {
    console.log(worker.length + ' file done');
});