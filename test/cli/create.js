// Load modules

var chai        = require('chai'),
    Lab         = require('lab'),
    labels      = require('../fixtures/labels.json'),
    rewire      = require('rewire'),
    sinon       = require('sinon');


var orient      = rewire('../../lib/cli/create'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = chai.expect;


// Tests
describe('Create', function() {


    var args;

    before(function(done) {

        sinon.stub(console, 'log').returns();
        done();
    });

    beforeEach(function(done) {

        args = { 
            _: [],
            f:          'test/fixtures/labels.json',
            file:       'test/fixtures/labels.json',
            u:          'myusername',
            username:   'myusername',
            p:          'mypassword',
            password:   'mypassword',
            r:          'username/repo',
            repository: 'username/repo',
            '$0':       'node ./bin/orient'
        };

        done();
    });

    after(function(done) {

        console.log.restore();
        done();
    });


    it('should have a create function', function(done) {
        
        expect( orient.create ).to.be.a('function');

        done();
    });


    it('should have a getLabelFile function', function(done) {
        
        expect( orient.getLabelFile ).to.be.a('function');

        done();
    });


    it('should load a labels json file', function(done) {

        sinon.spy(orient, 'getLabelFile');

        expect( orient.getLabelFile.callCount ).to.equal(0);

        var json = orient.getLabelFile('test/fixtures/labels.json');

        expect(orient.getLabelFile.callCount).to.equal(1);
        expect(json).to.equal(labels);

        orient.getLabelFile.restore();

        done();
    });


    it('should exit process with 1 with bad filepath', function(done) {

        sinon.stub(process, 'exit').returns(1);

        expect(process.exit()).to.equal(1); // pre test stub

        var json = orient.getLabelFile('idontexist.json');

        expect(json).to.equal(1);
        expect(process.exit.callCount).to.equal(2);

        process.exit.restore();

        done();
    });


    it('create should load json labels', function(done) {

        var stub = sinon.stub(orient, 'getLabelFile').returns({});

        var githubStub = {
            createLabels: function() {}
        };

        var github = orient.__set__('github', githubStub);
        
        orient.create(args);

        expect(stub.calledOnce).to.be.true;
        expect(stub.calledWith(args.file)).to.be.true;

        orient.getLabelFile.restore();

        github();

        done();
    });

    it('should create and update github labels', function(done) {

        var labels = [{
            name:  "Account",
            color: "#ccff00"
        }];

        sinon.stub(orient, 'getLabelFile').returns(labels);

        var updateSpy   = sinon.stub(orient, 'update').returns();
        var callbackSpy = sinon.spy();

        var githubStub = {
            createLabels: function(args, next) {
                callbackSpy(args);
                next(args.labels); // pass rejected labels back
            }
        };

        var authArgs = {
            username:   args.u,
            password:   args.p,
            repository: args.r,
            labels:     labels
        };

        var github = orient.__set__('github', githubStub);


        expect(callbackSpy.callCount).to.equal(0);
        expect(updateSpy.callCount).to.equal(0);
        orient.create(args);

        expect(callbackSpy.callCount).to.equal(1);
        expect(callbackSpy.calledWith(authArgs)).to.be.true;
        expect(updateSpy.callCount).to.equal(1);


        orient.getLabelFile.restore();
        orient.update.restore();
        github();

        done();
    });


    it('should create github labels', function(done) {

        var labels = [{
            name:  "Account",
            color: "#ccff00"
        }];

        sinon.stub(orient, 'getLabelFile').returns(labels);

        var updateSpy   = sinon.stub(orient, 'update').returns();
        var callbackSpy = sinon.spy();

        var githubStub = {
            createLabels: function(args, next) {
                callbackSpy(args);
                next(); // don't pass any rejected labels
            }
        };

        var authArgs = {
            username:   args.u,
            password:   args.p,
            repository: args.r,
            labels:     labels
        };

        var github = orient.__set__('github', githubStub);


        expect(callbackSpy.callCount).to.equal(0);
        expect(updateSpy.callCount).to.equal(0);
        orient.create(args);

        expect(callbackSpy.callCount).to.equal(1);
        expect(callbackSpy.calledWith(authArgs)).to.be.true;
        expect(updateSpy.callCount).to.equal(0);


        orient.getLabelFile.restore();
        orient.update.restore();
        github(); // restore github

        done();
    });

    
    it('should update github with appropriate values', function(done) {

        var callbackSpy = sinon.spy();

        var githubStub = {
            updateLabels: function(args, next) {
                callbackSpy(args);
                next();
            }
        };

        var optionArgs = {
            u:      args.u,
            p:      args.p,
            r:      args.r,
            labels: {}
        };
        
        var authArgs = {
            username:   args.u,
            password:   args.p,
            repository: args.r,
            labels:     {}
        };

        var github = orient.__set__('github', githubStub);

        expect(callbackSpy.callCount).to.equal(0);
        orient.update(optionArgs);

        expect(callbackSpy.callCount).to.equal(1);
        expect(callbackSpy.calledWith(authArgs)).to.be.true;

        github(); // restore github
        done();
    });

});

