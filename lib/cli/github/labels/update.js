// Load modules

var clc      = require('cli-color'),
    ghclient = require('../client'),
    github   = require('octonode'),
    Q        = require('q');


var patchLabel = function(ghlabel, label) {

    var deferred = Q.defer();

    ghlabel.update(label, function(err) {

        var message;

        if (err) {

            message = ghlabel.repo + ' failed to update label \'' + label.name + '\'';
            console.log(clc.red(message));
        } else {

            message = ghlabel.repo + ' updated label \'' + label.name + '\'';
            console.log(clc.green(message));
        }

        return deferred.resolve();
    });

    return deferred.promise;
};

var updateLabels = function(args, next) {

    console.log('\nUpdate labels:');

    var client   = ghclient.getClient(args),
        labels   = args.labels,
        promises = [],
        repo     = args.repository;

    for (var i = 0; i < labels.length; ++i) {

        if (!labels[i]) {

            continue;
        }

        var ghlabel = client.label(repo, labels[i].name);

        promises.push(
            patchLabel(ghlabel, labels[i])
        );
    }

    Q.all(promises).finally(function() {

        next();
    });

};


module.exports = {
    patchLabel: patchLabel,
    updateLabels: updateLabels
};