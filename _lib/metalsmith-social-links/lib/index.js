/**
 * User: daletan
 * Date: 6/8/15
 * Time: 9:28 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var socialLinks = require('./linksMap');

module.exports = plugin;

function plugin(options) {
    var networks = options.networks || ['facebook', 'instagram', 'twitter'];
    return function (files, metalsmith, done) {

        Object.keys(files).forEach(function (key) {
            var file = files[key];
            networks.forEach(function (network) {
                var networkValue = file[network];
                if (networkValue) {
                    file[network] = networkValue(network, networkValue)
                }
            });
        });

        done();
    }
}

function hasDomain(network, str) {
    var regexp = new RegExp(network)
    if (!regexp.test(str)) {
        // ugh...what to do here...
    }
}

function createNetworkLink(network, handle) {
    var ret = handle;
    var domainInHandle = hasDomain(network, handle);
    if (domainInHandle && socialLinks[network]) {

    }
    return ret;
}

