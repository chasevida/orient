// Load modules

var clc      = require('cli-color'),
    ghclient = require('../client'),
    github   = require('octonode'),
    Q        = require('q');


var self = this;

exports.postLabel = function(ghrepo, label) {

    var deferred = Q.defer();

    ghrepo.label(label, function (err) {

        var message,
            rejected = null;

        if (err) {

            rejected = label;
            message = ghrepo.name + ' failed to add label \'' + label.name + '\'';
            console.log(clc.red(message));
        } else {

            message = ghrepo.name + ' added label \'' + label.name + '\'';
            console.log(clc.green(message));
        }

        return deferred.resolve(rejected);
    });

    return deferred.promise;
};

exports.createLabels = function(args, next) {

    console.log('\nCreate labels:');

    var client   = ghclient.getClient(args),
        promises = [],
        these    = [],
        ghrepo   = client.repo(args.repository);

    for (var i = 0; i < args.labels.length; i ++) {

        promises.push(
            self.postLabel(ghrepo, args.labels[i])
        );
    }

    Q.all(promises).then(function(rejected) {

        console.log('done with create promises');
        next(rejected);
    });

};

