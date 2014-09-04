// Load modules

var github = require('octonode');


exports.getClient = function(args) {

    return github.client({
        username: args.username,
        password: args.password
    });
};
