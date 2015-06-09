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
 * @param {array} options.collections An array of collection types
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
        //console.log('archive: ', files);
        //console.log('archive here: ', arguments);
        var archive = {};
        var year;
        // todo: month archiving
        Object.keys(files).forEach(function (key) {
            var valueFound = false;
            var file;
            if (collectionsRegExp.test(key)) {
                file = files[key];
                dateFields.forEach(function (value) {
                    if (!valueFound && file[value]) {
                        // this will quit once the first instance is found
                        if (!archive[year]) {
                            year = moment(file[value]);
                            year = year.get('year');
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
        console.log('a=======================rchive: ', archive['2015']);
        metalsmith
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
