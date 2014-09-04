// Load modules

var fs    = require('fs'),
    path  = require('path'),
    yargs = require('yargs');


// Load text files

var startText = fs.readFileSync(path.join(__dirname, '../../doc/start.txt'), 'utf8'),
    usageText = fs.readFileSync(path.join(__dirname, '../../doc/done.txt'), 'utf8');


// Export argv

exports.argv = yargs
    .usage(startText + usageText)
    .option('u', {
        alias:      'username',
        describe:   'Github username',
        requiresArg: true,
        demand:      true
    })
    .option('p', {
        alias:      'password',
        describe:   'Github password',
        requiresArg: true,
        demand:      true
    })
     .option('r', {
        alias:      'repository',
        describe:   'Github repository name',
        requiresArg: true,
        demand:      true
    })
    .option('f', {
        alias:      'file',
        describe:   'Labels json file',
        requiresArg: true,
        demand:      true
    })
    .argv;
