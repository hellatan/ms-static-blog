/**
 * User: daletan
 * Date: 6/8/15
 * Time: 7:04 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var assert = require('assert');
var Metalsmith = require('metalsmith');
var archive = require('..');
var isArray = require('lodash.isarray');

describe('metalsmith archive groupings', function () {
    var M;
    beforeEach(function () {
        M = Metalsmith('test/fixtures');
    });
    it('should create archive metadata', function (done) {
        M.use(archive())
            .build(function (err) {
                if (err) {
                    return done(err);
                }
                var metadata = M.metadata();
                var archive = metadata.archive;
                var years = ['2015', '2014'];
                assert.ok(archive);
                assert.ok(archive.length === 2);
                archive.forEach(function (data, index) {
                    var year = years[index];
                    assert.equal(data.year, year);
                });
                done();
            });
    });
    it('should build an archive from a specific folder', function (done) {
        M.use(archive({
                collections: 'rando'
            }))
            .build(function (err) {
                if (err) {
                    return done(err);
                }
                var metadata = M.metadata();
                var archive = metadata.archive;
                var years = ['2015', '2014'];
                archive.forEach(function (posts, index) {
                    var year = years[index];
                    assert.equal(posts.year, year);
                    posts.data.forEach(function (post) {
                        assert.ok(/^rando\//.test(post.fileName));
                    });
                });
                done();
            });
    });
    it('should sort the archive by year/month combo', function (done) {
        M.use(archive({
                groupByMonth: true
            }))
            .build(function (err) {
                if (err) {
                    return done(err);
                }
                var metadata = M.metadata();
                var archive = metadata.archive;
                archive.forEach(function (archiveYear) {
                    assert.ok(isArray(archiveYear.months));
                    archiveYear.months.forEach(function (month) {
                        assert.ok(typeof month.name === 'string');
                        assert.ok(isArray(month.data));
                        assert.ok(month.data.length > 0);
                    });
                });
                done();
            });
    });
});
