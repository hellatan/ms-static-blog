/**
 * User: daletan
 * Date: 5/22/15
 * Time: 2:40 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
    .source('./_src')
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(permalinks({
        pattern: ':title'
    }))
    .destination('./posts')
    .build(function(err) {
        if (err) throw err;
    });
