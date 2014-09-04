#!/usr/bin/env node


// Load modules

var orient = require('../lib'),
    argv   = require('../lib/cli/argv').argv;


// Run the command-line client

orient.create(argv);
