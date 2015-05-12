'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aspnet-tiny:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['--skip-install'])
        .withPrompts({ appName: 'test-app' })
        .on('end', done);
    });

    it('creates files', function () {
        // yes, there could be more :-)
        assert.file([
            '.editorconfig',
        ]);
    });
});
