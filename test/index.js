// Load modules

var Lab         = require('lab');

var orient      = require('../lib'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = Lab.expect;


// Tests
describe('Orient', function() {


    it('should exist', function(done) {
        
        expect( orient ).to.be.a('object');
        done();
    });

    it('should have a create function', function(done) {
        
        expect( orient.create ).to.be.a('function');
        done();
    });

});