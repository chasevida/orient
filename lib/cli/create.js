// Load modules

var clc    = require('cli-color'),
    fs     = require('fs'),
    github = require('./github'),
    path   = require('path');


// Load text files

var startText = fs.readFileSync(path.join(__dirname, '../../doc/start.txt'), 'utf8'),
    doneText  = fs.readFileSync(path.join(__dirname, '../../doc/done.txt'), 'utf8');


var create = function(argv) {

    console.log(startText);

    var self   = this,
        labels = getLabelFile(argv.f);

    github.createLabels({
        username:   argv.u,
        password:   argv.p,
        repository: argv.r,
        labels:     labels
    }, function(rejectedLabels) {


        if (rejectedLabels) {

            argv.labels = rejectedLabels;
            update(argv);
        } else {

            console.log(doneText);
        }
    });
};

var update = function(argv) {

    github.updateLabels({
        username:   argv.u,
        password:   argv.p,
        repository: argv.r,
        labels:     argv.labels
    }, function() {

        console.log(doneText);
    });
}

var getLabelFile = function(filename) {

    var filepath = path.join(process.cwd(), filename);

    if (!fs.existsSync(filepath)) {
        
        console.log(clc.red('Error: cannot find the file: ' + filename));
        console.log(clc.red('Orient exited process with 1'));
        return process.exit(1);
    }

    return require(filepath);
};


module.exports = {
    create: create,
    update: update,
    getLabelFile: getLabelFile
};

