/**
 * User: daletan
 * Date: 6/5/15
 * Time: 6:06 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var isArray = require('lodash.isarray');
var moment = require('moment');

module.exports = plugin;

/**
 * This groups collections into objects based on publishDate, modifiedDate, then date fields in YAML Front Matter (YFM)
 * @param options
 * @param {array} options.collections An array of collection types - anything that creates root-relative articles/posts
 * @returns {Function}
 */
function plugin(options) {
    options = options || {};
    var collections = options.collections || ['posts'];
    var dateFields = options.dateFields || ['publishDate', 'modifiedDate', 'date'];

    if (!isArray(collections)) {
        throw new Error('options.collections must be an array');
    }
    if (!isArray(dateFields)) {
        throw new Error('options.dateFields must be an array');
    }

    var collectionsRegExpString = collections.join('|');
    var collectionsRegExp = new RegExp('^' + collectionsRegExpString);

    return function (files, metalsmith, done) {
        var metadata = metalsmith.metadata();
        //console.log('archive: ', files);
        //console.log('archive here: ', arguments);
        var archive = {};
        // todo: month archiving
        Object.keys(files).forEach(function (key) {
            var valueFound = false;
            var file;
            var year;
            if (collectionsRegExp.test(key)) {
                file = files[key];
                dateFields.forEach(function (value) {
                    if (!valueFound && file[value]) {
                        // this will quit once the first instance is found
                        year = moment.utc(file[value]);
                        year = year.get('year');
                        if (!archive[year]) {
                            console.log("year::::::::::::: ", year);
                            archive[year] = [];
                        }
                        archive[year].push(file);
                        valueFound = true;
                    } else {
                        valueFound = false;
                    }
                });
            }
        });

        Object.keys(archive).forEach(function (year) {
            var posts = archive[year];
            var lastDate;
            posts.sort(function (a, b) {
                var aDate;
                var bDate;
                switch (true) {
                    case a.publishDate:
                        aDate = a.publishDate;
                        break;
                    case a.modifiedDate:
                        aDate = a.modifiedDate;
                        break;
                    case a.date:
                        aDate = a.date;
                        break;
                }
                switch (true) {
                    case b.publishDate:
                        bDate = b.publishDate;
                        break;
                    case b.modifiedDate:
                        bDate = b.modifiedDate;
                        break;
                    case b.date:
                        bDate = b.date;
                        break;
                }

                return new Date(bDate) - new Date(aDate);
            });
        });
        console.log('a=======================rchive: ', archive);
        metadata.archive = archive;
        console.log(metalsmith.metadata()['archive']);
        done();
    }
}

// might need to be changed around
function checkIfIsArray(obj, key) {
    if (!isArray(obj[key])) {
        throw new Error('options.[' + key + '] must be an array');
    }
    return true;
}
