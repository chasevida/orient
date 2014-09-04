// Load modules

var Lab         = require('lab');

var github      = require('../../../lib/cli/github'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = Lab.expect;


// Tests
describe('Github', function() {


    it('should exist', function(done) {
        
        expect( github ).to.be.a('object');
        done();
    });

    it('should have a create labels function', function(done) {
        
        expect( github.createLabels ).to.be.a('function');
        done();
    });

    it('should have a update labels function', function(done) {
        
        expect( github.updateLabels ).to.be.a('function');
        done();
    });

});