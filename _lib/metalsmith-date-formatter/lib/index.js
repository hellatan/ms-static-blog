/**
 * User: daletan
 * Date: 5/27/15
 * Time: 12:10 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var moment = require('moment');

module.exports = plugin;

/**
 *
 * @param options
 * @param {string|boolean} options.publishDateKey Defaults to `publishDate` If `false`, it will ignore the property
 * @param {string|boolean} options.modifiedDateKey Defaults to `modifiedDate` If `false`, it will ignore the property
 * @param {string} options.format Any date format that `moment` accepts
 * @returns {Function}
 */
function plugin(options) {

    options = options || {};

    return function (files, metalsmith, done) {

        var format = options.format || 'MMMM DD,YYYY';

        if (options.publishDateKey === false || options.modifiedDateKey === false) {
            return done();
        }

        var publishDateKey = options.publishDateKey || 'publishDate';
        var modifiedDateKey = options.modifiedDateKey || 'modifiedDate';

        Object.keys(files).forEach(function (key) {
            var file = files[key];
            var pubDate = file[publishDateKey];
            var modDate = file[modifiedDateKey];
            if (pubDate) {
                file[publishDateKey] = moment(pubDate).format(format);
            }
            if (modDate) {
                file[modifiedDateKey] = moment(modDate).format(format);
            }
        });

        done();
    }

}
